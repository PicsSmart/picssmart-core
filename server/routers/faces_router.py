import logging

from fastapi import APIRouter
from bson import ObjectId

from server.routers import WickORJSONResponse
from server.db import faces

from pydantic import BaseModel

LOG = logging.getLogger(__name__)
router = APIRouter()


@router.get("/faces", response_class=WickORJSONResponse)
async def get_faces(sort: str = "name", skip: int = 0, limit: int = 100):
    return WickORJSONResponse(
        await faces.get_face_groups(
            {},
            {
                "_id": 1,
                "imageId": 1,
                "face": 1,
                "groupId": 1,
                "facesCount": 1,
                "isProminant": 1,
            },
            [("isProminant", -1), ("facesCount", -1), ("_id", 1)],
            skip,
            limit,
        )
    )


@router.get("/faces/{group}")
async def get_face_by_id(
    group: str, sort: str = "name", skip: int = 0, limit: int = 100
):
    return WickORJSONResponse(
        await faces.get_media_by_face_group(group, sort, skip, limit)
    )

class FaceCoordinates(BaseModel):
    left: float
    top: float
    right: float
    bottom: float

class FaceObj(BaseModel):
    face: FaceCoordinates
    imageId: str

@router.post("/faces/group")
async def get_face_group_id_by_face(faceObj: FaceObj):
    return WickORJSONResponse(
        await faces.get_face_group_by_face(faceObj.face.dict(), faceObj.imageId)
    )
