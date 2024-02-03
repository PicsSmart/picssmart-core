from server.indexing import image_captioning
from server.indexing import face_detection
from server.indexing import file_indexer
from server.indexing import face_clustering
from server.indexing import image_text_search

def run_each_task(cwd, thread_killer, process_killer):
    if not thread_killer.is_set():
        file_indexer.run_indexing(cwd)
    if not thread_killer.is_set():
        face_detection.run_face_detection(cwd, process_killer)
    if not thread_killer.is_set():
        face_clustering.run_face_clustering(cwd, thread_killer)
    if not thread_killer.is_set():
        image_captioning.run_image_captioning(cwd, process_killer)
    if not thread_killer.is_set():
        image_text_search.run_text_search(cwd, process_killer)
    pass
