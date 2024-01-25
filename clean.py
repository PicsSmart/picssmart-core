from server.db import async_client


async_client.picssmart.drop_collection("albums")
async_client.picssmart.drop_collection("media")
async_client.picssmart.drop_collection("faces")
async_client.picssmart.drop_collection("face_groups")
async_client.picssmart.media.update_many(
    {},
    {"$unset": {"caption": "", "faces": "", "faceEncodings": "", "probs": ""}},
)
