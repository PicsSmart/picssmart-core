import logging
from fastapi import APIRouter, status
from fastapi import File, UploadFile
from fastapi.responses import JSONResponse, Response
from bson import ObjectId

import asyncio
from concurrent.futures import ThreadPoolExecutor
from server import CWD
from threading import Event as TEvent
from multiprocessing import Event as MPEvent

from server.utils import task_manager

from PIL import Image
from io import BytesIO

from server import conf
from server.vectorDB import search, scroll, get_image_vectors, get_text_vectors
from server.db import media
from server.routers import WickORJSONResponse
from server.jobs import message_producer

from skimage.filters import threshold_otsu
import numpy as np

from pydantic import BaseModel
from fastapi import Request
import shutil
import os
from pathlib import Path
import zipfile
import tempfile

LOG = logging.getLogger(__name__)
router = APIRouter()

class Caption(BaseModel):
    caption: str


@router.post("/text-search")
async def text_search(caption_input: Caption, sort: str = "name", skip: int = 0, limit: int = 100000):
    if caption_input.caption == "":
        return WickORJSONResponse(await media.get_media({}, {"_id": 1, "path":1, "albumIds":1, "name":1, "caption":1}, sort, skip))
    caption = caption_input.caption
    features_text = get_text_vectors(caption)
    hits = search(
            conf.qdrant_collection,
            features_text.text_embeds_proj[:,0,:].cpu().numpy()[0],
    )
    similarity_scores = [hit.score for hit in hits]
    threshold = threshold_otsu(np.array(similarity_scores))
    filtered_hits = filter(lambda hit: hit.score > threshold, hits)
    result_json = {"results": list(map(lambda hit:{"payload": hit.payload, "score": hit.score}, filtered_hits))}

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
    similarity_scores = [hit.score for hit in hits]
    threshold = threshold_otsu(np.array(similarity_scores))
    filtered_hits = filter(lambda hit: hit.score > threshold, hits)
    result_json = {"results": list(map(lambda hit: {"payload": hit.payload, "score": hit.score}, filtered_hits))}

    return JSONResponse(content=result_json)

@router.post("/similar-search")
async def similarity_search_get_post(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(BytesIO(contents))
    features_image = get_image_vectors(image)
    hits = search(
        conf.qdrant_collection,
        features_image.image_embeds_proj[:,0,:].cpu().numpy()[0]
    )
    similarity_scores = [hit.score for hit in hits]
    threshold = threshold_otsu(np.array(similarity_scores))
    filtered_hits = filter(lambda hit: hit.score > threshold, hits)
    result_json = {"results": list(map(lambda hit: {"payload": hit.payload, "score": hit.score}, filtered_hits))}
    return JSONResponse(content=result_json)

def copy_images_recursively(source, destination):
    # Define image extensions
    image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp')

    # Create destination folder if it doesn't exist
    os.makedirs(destination, exist_ok=True)

    # Recursively copy files and folders
    items = os.listdir(source)
    if len(items) == 0:
        return
    for item in items:
        # if item is a folder, recursively copy images in folder
        if os.path.isdir(os.path.join(source, item)):
            new_source = os.path.join(source, item)
            new_destination = os.path.join(destination, item)
            copy_images_recursively(new_source, new_destination)
        # if item is an image, copy image
        elif item.endswith(image_extensions):
            shutil.copy2(os.path.join(source, item), destination)

@router.post("/mount_album")
async def mount_album(request: Request):
    reqBody = await request.form()
    if 'folder' not in reqBody:
        raise JSONResponse(status_code=400, detail="No valid folder is provided")
    
    zipped_folder = reqBody['folder']
    temp_folder = extract_zip_to_temp_folder(zipped_folder)
    for root, dirs, files in os.walk(temp_folder):
        if dirs:
            source_folder = os.path.join(root, dirs[0])
            break

    folderName = os.path.basename(source_folder)

    relative_path = os.path.join(os.path.dirname(__file__), '../../data/', folderName)
    destination_folder = Path(relative_path).resolve()

    copy_images_recursively(source_folder, destination_folder)
    
    shutil.rmtree(temp_folder)

    loop = asyncio.get_running_loop()
    executor = ThreadPoolExecutor(max_workers=8)
    callback_args = (
        conf.kafka_topic,
        {"status": "processed"}
    )
    task_waterfall = loop.run_in_executor(
        executor, task_manager.run_each_task, CWD, TEvent(), MPEvent(),
        message_producer.send_message, callback_args
    )

    return JSONResponse(content={"message": "Album is mounted and images are being processed."},
                        status_code = status.HTTP_202_ACCEPTED)

def extract_zip_to_temp_folder(zip_file):
    try:
        suffix = Path(zip_file.filename).suffix
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            shutil.copyfileobj(zip_file.file, tmp)
            tmp_path = Path(tmp.name)
    finally:
        zip_file.file.close()
    temp_folder = tempfile.mkdtemp()
    with zipfile.ZipFile(tmp_path, 'r') as zip_ref:
        zip_ref.extractall(path = temp_folder)
    
    os.remove(tmp_path)
    return temp_folder

@router.get("/scenes")
async def scenes_get():
    SCENES = conf.supported_scene_types
    result_json = {"scenes": list(SCENES)}
    return JSONResponse(content=result_json)

@router.get("/scenes/thumbnail/{scene}", response_class=Response)
async def scenes_get(scene: str):
    if scene not in conf.supported_scene_types:
        return JSONResponse(content={"error": "Scene not found"}, status_code=404)

    image = Image.open(BytesIO(open(f"server/routers/assets/{scene}.jpg", "rb").read()))
    image.thumbnail(conf.thumbnail_resolution)
    thumbnail_bytes = BytesIO()
    image.save(thumbnail_bytes, format="JPEG")
    return Response(content=thumbnail_bytes.getvalue(), media_type="image/jpeg")

@router.get("/scenes/{scene}")
async def scenes_get(scene: str):
    if scene not in conf.supported_scene_types:
        return JSONResponse(content={"error": "Scene not found"}, status_code=404)

    image = Image.open(BytesIO(open(f"server/routers/assets/{scene}.jpg", "rb").read()))

    features_image = get_image_vectors(image)
    hits = search(
        conf.qdrant_collection,
        features_image.image_embeds_proj[:,0,:].cpu().numpy()[0]
    )
    similarity_scores = [hit.score for hit in hits]
    threshold = threshold_otsu(np.array(similarity_scores))
    filtered_hits = filter(lambda hit: hit.score > threshold, hits)
    result_json = {"results": list(map(lambda hit: {"payload": hit.payload, "score": hit.score}, filtered_hits))}
    return JSONResponse(content=result_json)