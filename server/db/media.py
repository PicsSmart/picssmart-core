from typing import Any, Optional
from bson import ObjectId
import base64

from server.db import client, async_client


async def create_media(name: str, path: str, album_id: Optional[str]):
    document = {
        'name': name,
        'path': path,
        'albumId': album_id,
    }
    result = await client.picssmart.media.insert_one(document)

    return result


async def get_media_by_id(query: Any, projection: Any):
    result = await client.picssmart.media.find_one(query, projection=projection)
    return result


async def get_media(query: Any, projection: Any, sort: Any, skip: int, limit: int):
    result = await client.picssmart.media.find(query, projection=projection).sort(sort).skip(skip).limit(limit).to_list(None)
    return result


def get_media_sync(query: Any, projection: Any, sort: Any, skip: int, limit: int):
    result = async_client.picssmart.media.find(query, projection=projection).sort(sort).skip(skip).limit(limit)
    return result


async def update_media(filter: Any, update: dict, upsert=False, *args):
    result = await client.picssmart.media.update_one(filter, update, upsert, *args)

    return result


def update_media_sync(filter: Any, update: dict, upsert=False, *args):
    result = async_client.picssmart.media.update_one(filter, update, upsert, *args)

    return result


async def update_medias(filter: Any, update: dict, upsert=False, *args):
    result = await client.picssmart.media.update_many(filter, update, upsert, *args)

    return result
