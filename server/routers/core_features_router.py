import logging
from fastapi import APIRouter

from fastapi.responses import JSONResponse

from server import conf
from server.vectorDB import search, scroll
from server.db import media
from server.routers import WickORJSONResponse

from bson import ObjectId

from qdrant_client import QdrantClient

import torch
from lavis.models import load_model_and_preprocess

from pydantic import BaseModel

LOG = logging.getLogger(__name__)
router = APIRouter()

class Caption(BaseModel):
    caption: str


@router.post("/text_search")
async def text_search(caption_input: Caption, sort: str = "name", skip: int = 0, limit: int = 10):
    if caption_input.caption == "":
        return WickORJSONResponse(await media.get_media({}, {"_id": 1, "path":1, "albumIds":1, "name":1, "caption":1}, sort, skip, 1000))
    client = QdrantClient(host=conf.qdrant_host, port=conf.qdrant_port)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model, vis_processors, txt_processors = load_model_and_preprocess(name="blip_feature_extractor", model_type="base", 
                                                                      is_eval=True, device=device)
    caption = caption_input.caption
    text_input = txt_processors["eval"](caption)
    sample = {"text_input": [text_input]}
    features_text = model.extract_features(sample, mode="text")
    hits = search(
            conf.qdrant_collection,
            features_text.text_embeds_proj[:,0,:].cpu().numpy()[0],
            limit
    )
    result_json = {"results": list(map(lambda hit: {"payload": hit.payload, "score": hit.score}, hits))}

    return JSONResponse(content=result_json)

@router.get("/similar-search")
async def text_search(imageId, sort: str = "name", skip: int = 0, limit: int = 100000):
    vector = scroll(conf.qdrant_collection, imageId)
    hits = search(
        conf.qdrant_collection,
        vector,
    )
    
    result_json = {"results": list(map(lambda hit: {"payload": hit.payload, "score": hit.score}, hits))}

    return JSONResponse(content=result_json)