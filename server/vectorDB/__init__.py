from qdrant_client import QdrantClient
from qdrant_client.http import models

import torch
from lavis.models import load_model_and_preprocess

from server import conf

client = QdrantClient(host=conf.qdrant_host, port=conf.qdrant_port)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model, vis_processors, txt_processors = load_model_and_preprocess(name="blip_feature_extractor", model_type="base", 
                                                                    is_eval=True, device=device)

def create_collection(collection_name):
    try:
        picsSmartCollection = client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(size=256, distance=models.Distance.COSINE)
        )
        return True
    except:
        return False

def upsert(collection_name, index, data, payload):
    client.upsert(
        collection_name=collection_name,
        points=models.Batch(
            ids=index,
            vectors=data,
            payloads=payload
        )
    )

    
def search(collection_name, data, limit=1000):
    hits = client.search(
        collection_name=collection_name,
        query_vector=data,
        limit=limit
    )
    return hits

def scroll(collection_name, image_id):
    results = client.scroll(
        collection_name=collection_name,
        scroll_filter=models.Filter(
                must=[
                    models.FieldCondition(
                        key="_id",
                        match=models.MatchValue(value=image_id),
                    )
                ]
            ),
            with_vectors=True
        )
    if results[0] != []: return results[0][0].vector
    return []

def get_text_vectors(text):
    text_input = txt_processors["eval"](text)
    sample = {"text_input": [text_input]}
    return model.extract_features(sample, mode="text")

def get_image_vectors(image):
    image = vis_processors["eval"](image).unsqueeze(0).to(device)
    sample = {"image": image}
    return model.extract_features(sample, mode="image")

