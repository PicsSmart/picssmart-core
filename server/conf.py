from multiprocessing import cpu_count
from dotenv import load_dotenv
import os

mongo_db_host = os.getenv("mongo_db_host")
mongo_db_port = int(os.getenv("mongo_db_port"))
mongo_db_user = os.getenv("mongo_db_user")
mongo_db_password = os.getenv("mongo_db_password")
mongo_db_database = os.getenv("mongo_db_database")
mongo_db_auth = os.getenv("mongo_db_auth")

EPOCS_FEDERATED = 1 #TODO: Determine the number of epocs for federated learning
server_address_federated = os.getenv("server_address_federated")

qdrant_host= os.getenv("qdrant_host")
qdrant_port = int(os.getenv("qdrant_port"))
qdrant_collection = os.getenv("qdrant_collection")

# gpu/cpu configs
image_captioning_workers_per_gpu = 4
face_detection_workers_per_device = 1
face_detection_batch_size = 128
face_clustering_workers = cpu_count()
face_detector = "mtcnn"
face_model = "ArcFace"
face_distance_metric = "cosine"
face_distance_threshold = 0.8
face_count_prominance_threshold = 2

# album
thumbnail_resolution = 250, 250

# format support
supported_image_types = [
    "jpg",
    "JPG",
    "JPEG",
    "jpeg",
    "HEIC",
    "heic",
    "png"
]

supported_scene_types = [
    "beach",
    "forest",
    "mountain",
]
