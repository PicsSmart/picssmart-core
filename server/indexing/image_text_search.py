import os
import logging

from PIL import Image
import torch
from lavis.models import load_model_and_preprocess

from server import conf
from server.vectorDB import create_collection, upsert

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
    collection_name = conf.qdrant_collection
    result = create_collection(collection_name)
    if (result):
        LOG.debug(f"Created collection {collection_name}")
    else:
        LOG.debug(f"Collection {collection_name} already exists")

    LOG.debug(f"Starting vectorizing the images")
    index, data, payload = vectorizing_images(task_dir)
    upsert(collection_name, index, data, payload)
    LOG.debug(f"Vectorizing the images finished")
    
def run_text_search(task_dir, killer):
    process = Process(target=runner, args=(task_dir, killer))
    process.start()
    process.join()

