import os
import logging
import asyncio

from PIL import Image
import torch
from lavis.models import load_model_and_preprocess

from server import conf
from server.vectorDB import create_collection, upsert
from server.db import media


from qdrant_client import QdrantClient
from qdrant_client.http import models


from multiprocessing import Process
LOG = logging.getLogger(__name__)

async def vectorizing_images(task_dir):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model, vis_processors, txt_processors = load_model_and_preprocess(name="blip_feature_extractor", model_type="base", 
                                                                      is_eval=True, device=device)
    content = await media.get_media({}, {"_id": 1, "path":1, "albumIds":1, "name":1, "caption":1}, "name", 0, 1000)
    folder_path = os.path.join(task_dir, "data")
    payload = []
    data = []
    for item in content:
        image_path = os.path.join(folder_path, item["path"])
        record = {
            '_id': str(item["_id"]),
            'path': item["path"],
            'name': item["name"],
            'caption': item["caption"] if "caption" in item else "",
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
    collection_name = conf.qdrant_collection
    result = create_collection(collection_name)
    if (result):
        LOG.debug(f"Created collection {collection_name}")
    else:
        LOG.debug(f"Collection {collection_name} already exists")

    LOG.debug(f"Starting vectorizing the images")
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    # Run the async function within the event loop
    index, data, payload = loop.run_until_complete(vectorizing_images(task_dir))
    
    # Close the event loop
    loop.close()
    upsert(collection_name, index, data, payload)
    LOG.debug(f"Vectorizing the images finished")
    
def run_text_search(task_dir, killer):
    process = Process(target=runner, args=(task_dir, killer))
    process.start()
    process.join()

