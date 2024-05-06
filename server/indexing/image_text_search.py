import os
import logging
import asyncio

from PIL import Image
import torch
import numpy as np
from lavis.models import load_model_and_preprocess

from server import conf
from server.vectorDB import create_collection, upsert
from server.db import media, async_client


from multiprocessing import Process
LOG = logging.getLogger(__name__)

def save_vector(_id, featureVector):
    async_client.picssmart.media.update_one(
        {"_id": _id},
        {
            "$set": {
                "featureVector": featureVector.tolist()
            }
        },
    )

async def vectorizing_images(task_dir):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model, vis_processors, txt_processors = load_model_and_preprocess(name="blip_feature_extractor", model_type="base", 
                                                                      is_eval=True, device=device)
    content = await media.get_media({}, {"_id": 1, "path":1, "albumIds":1, "name":1, "caption":1}, "name", 0)
    folder_path = os.path.join(task_dir, "data")
    payload = []
    data = []
    for item in content:
        image_path = os.path.join(folder_path, item["path"])
        if image_path.lower().endswith('csv'):
            continue
        record = {
            '_id': str(item["_id"]),
            'path': item["path"],
            'name': item["name"],
            'caption': item["caption"] if "caption" in item else "",
        }
        payload.append(record)
        if "featureVector" not in item or item["featureVector"] is None:
            raw_image = Image.open(image_path).convert("RGB")
            image = vis_processors["eval"](raw_image).unsqueeze(0).to(device)
            sample_img = {"image": image}
            features_image = model.extract_features(sample_img, mode="image")
            featureVector = features_image.image_embeds_proj[:,0,:].cpu().numpy()[0]
            data.append(featureVector)
            save_vector(item["_id"], featureVector)
        else:
            data.append(np.fromiter(item["featureVector"], dtype=np.float32))
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

