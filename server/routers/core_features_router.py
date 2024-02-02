import logging
from fastapi import APIRouter
from fastapi import File, UploadFile
from fastapi.responses import JSONResponse

from server.utils import image_processing

from PIL import Image
from io import BytesIO

from server import conf
from server.vectorDB import search, scroll
from server.db import media
from server.routers import WickORJSONResponse


from pydantic import BaseModel

LOG = logging.getLogger(__name__)
router = APIRouter()

class Caption(BaseModel):
    caption: str


@router.post("/text-search")
async def text_search(caption_input: Caption, sort: str = "name", skip: int = 0, limit: int = 100000):
    if caption_input.caption == "":
        return WickORJSONResponse(await media.get_media({}, {"_id": 1, "path":1, "albumIds":1, "name":1, "caption":1}, sort, skip, 1000))
    caption = caption_input.caption
    features_text = image_processing.get_text_vectors(caption)
    hits = search(
            conf.qdrant_collection,
            features_text.text_embeds_proj[:,0,:].cpu().numpy()[0],
    )
    result_json = {"results": list(map(lambda hit: {"payload": hit.payload, "score": hit.score}, hits))}

    return JSONResponse(content=result_json)

@router.get("/similar-search")
async def similarity_search_get(imageId, sort: str = "name", skip: int = 0, limit: int = 100000):
    vector = scroll(conf.qdrant_collection, imageId)
    if vector != []:
        hits = search(
            conf.qdrant_collection,
            vector,
        )
    else:
        hits = []    
    result_json = {"results": list(map(lambda hit: {"payload": hit.payload, "score": hit.score}, hits))}

    return JSONResponse(content=result_json)

@router.post("/similar-search")
async def similarity_search_get_post(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(BytesIO(contents))
    features_image = image_processing.get_image_vectors(image)
    hits = search(
        conf.qdrant_collection,
        features_image.image_embeds_proj[:,0,:].cpu().numpy()[0]
    )
    result_json = {"results": list(map(lambda hit: {"payload": hit.payload, "score": hit.score}, hits))}
    return JSONResponse(content=result_json)