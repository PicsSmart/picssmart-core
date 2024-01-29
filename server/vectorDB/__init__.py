from qdrant_client import QdrantClient
from qdrant_client.http import models

from server import conf

client = QdrantClient(host=conf.qdrant_host, port=conf.qdrant_port)

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

    
def search(collection_name, data, limit=10):
    hits = client.search(
        collection_name=collection_name,
        query_vector=data,
        limit=limit
    )
    return hits