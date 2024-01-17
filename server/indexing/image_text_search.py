import os
import logging

from PIL import Image
import torch
from lavis.models import load_model_and_preprocess

from server import conf

from qdrant_client import QdrantClient
from qdrant_client.http import models


from multiprocessing import Process
LOG = logging.getLogger(__name__)

def vectorizing_images(task_dir):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model, vis_processors, txt_processors = load_model_and_preprocess(name="blip_feature_extractor", model_type="base", 
                                                                      is_eval=True, device=device)
    folder_path = os.path.join(task_dir, "data")
    payload = []
    data = []
    for root, dirs, files in os.walk(folder_path):
        for file_name in files:
            if file_name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                image_path = os.path.join(root, file_name)
                record = {
                    'path':image_path
                }
                raw_image = Image.open(image_path).convert("RGB")
                image = vis_processors["eval"](raw_image).unsqueeze(0).to(device)
                sample_img = {"image": image}
                payload.append(record)
                features_image = model.extract_features(sample_img, mode="image")
                data.append(features_image.image_embeds_proj[:,0,:].cpu().numpy()[0])
    index = list(range(len(data)))
    return index, data, payload


    
def runner(task_dir, killer):
    client = QdrantClient(host=conf.qdrant_host, port=conf.qdrant_port)
    collection = conf.qdrant_collection
    try:
        picsSmartCollection = client.create_collection(
            collection_name=collection,
            vectors_config=models.VectorParams(size=256, distance=models.Distance.COSINE)
        )
        LOG.debug(f"Created collection {collection}")
    except:
        LOG.debug(f"Collection {collection} already exists")

    LOG.debug(f"Starting vectorizing the images")
    index, data, payload = vectorizing_images(task_dir)
    client.upsert(
        collection_name=collection,
        points=models.Batch(
            ids=index,
            vectors=data,
            payloads=payload
        )
    )
    LOG.debug(f"Vectorizing the images finished")
    
def run_text_search(task_dir, killer):
    process = Process(target=runner, args=(task_dir, killer))
    process.start()
    process.join()

