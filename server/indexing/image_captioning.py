import pathlib
import logging
from threading import Thread
from multiprocessing import Event, Process
import gc

from PIL import Image
import torch

from server.db import async_client
from server.conf import image_captioning_workers_per_gpu, supported_image_types
from server.indexing.utils import DataLoader
from server.federated_learning.image_captioning.Model import model, processor, DEVICE

LOG = logging.getLogger(__name__)


class CaptioningWorker(Thread):
    def __init__(
        self,
        data_loader: DataLoader,
        worker_id: str,
        device_name: str,
        task_dir: str,
        killer: Event,
    ):
        Thread.__init__(self)
        self.data_loader = data_loader
        self.worker_id = worker_id
        self.device_name = device_name
        self.task_dir = task_dir
        self.killer = killer
        self.processed = 0

    def run(self) -> None:
        fetch = True
        LOG.debug(f"Starting image captioning worker {self.worker_id}")

        while fetch and not self.killer.is_set():
            fetch = False
            data = self.data_loader.get_next_batch()
            self.processed += len(data)

            for entry in data:
                fetch = True
                if self.killer.is_set():
                    break
                self.processed += 1
                path = (
                    pathlib.Path()
                    .joinpath(self.task_dir, "data", entry["path"])
                    .as_posix()
                )
                raw_image = Image.open(path).convert("RGB")
                inputs = processor(images=raw_image, return_tensors="pt").to(DEVICE)
                pixel_values = inputs.pixel_values

                with torch.no_grad():
                    generated_ids = model.generate(pixel_values=pixel_values, max_length=50)
                    captions = processor.batch_decode(generated_ids, skip_special_tokens=True)

                async_client.picssmart.media.update_one(
                    {"_id": entry["_id"]},
                    {
                        "$set": {
                            "caption": "\n".join(
                                [caption.capitalize() for caption in captions]
                            )
                        }
                    },
                )

        with torch.no_grad():
            torch.cuda.empty_cache()

        LOG.debug(
            f"IMAGE_CAPTIONING_WORKER {self.worker_id} proceessed {self.processed} images. "
            + ("Exit by kill!" if self.killer.is_set() else "")
        )


def runner(task_dir, killer):
    device_count = torch.cuda.device_count()
    data_loader = DataLoader(
        async_client.picssmart.media,
        {
            "$and": [
                {"caption": {"$exists": False}},
                {
                    "path": {
                        "$regex": "|".join([f"{fmt}$" for fmt in supported_image_types])
                    }
                },
            ]
        },
        {"_id": 1, "path": 1},
        "name",
        50,
    )

    if data_loader.get_count() == 0:
        LOG.debug(f"Image captioning not needed")
        return

    LOG.debug(f"Image captioning needed for {data_loader.get_count()}.")

    if device_count > 0:
        workers = []
        for d in range(device_count):
            device_name = f"cuda:{d}"
            for w in range(image_captioning_workers_per_gpu):
                workers.append(
                    CaptioningWorker(
                        data_loader, f"GPU{d}:WORKER{w}", device_name, task_dir, killer
                    )
                )
        LOG.debug(f"Running {len(workers)} image captioning workers")
        [worker.start() for worker in workers]
        [worker.join() for worker in workers]
    else:
        LOG.debug("CUDA not found!")
        LOG.debug(f"Running 1 image captioning workers")
        captioning_worker = CaptioningWorker(
            data_loader, "CPU:1", "cpu", task_dir, killer
        )
        captioning_worker.start()
        captioning_worker.join()

    gc.collect()

    LOG.debug(
        f"CUDA memory after clanup allocated: {torch.cuda.memory_allocated()}, reserved {torch.cuda.memory_reserved()}"
    )
    LOG.debug(f"Captioning complete")


def run_image_captioning(task_dir, killer):
    process = Process(target=runner, args=(task_dir, killer))
    process.start()
    process.join()
