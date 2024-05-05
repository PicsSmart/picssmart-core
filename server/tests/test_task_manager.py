import pytest
from unittest.mock import Mock, patch
from server.utils.task_manager import run_each_task

@pytest.mark.parametrize("test_id, thread_killer_set, process_killer_set, callback, callback_args", [
    ("T1", False, False, None, None),  # Happy path, no callback
    ("T2", False, False, Mock(), ("arg1", "arg2")),  # Happy path, with callback
    ("T3", True, False, None, None),  # Edge case, thread killer set initially
    ("T4", False, True, None, None),  # Edge case, process killer set during face detection
    ("T5", False, False, Mock(), ()),  # Edge case, callback with no args
])
def test_run_each_task(test_id, thread_killer_set, process_killer_set, callback, callback_args):
    # Arrange
    cwd = "/fake/directory"
    thread_killer = Mock(is_set=Mock(return_value=thread_killer_set))
    process_killer = Mock(is_set=Mock(return_value=process_killer_set))

    with patch("server.indexing.file_indexer.run_indexing") as mock_indexing, \
         patch("server.indexing.face_detection.run_face_detection") as mock_face_detection, \
         patch("server.indexing.face_clustering.run_face_clustering") as mock_face_clustering, \
         patch("server.indexing.image_captioning.run_image_captioning") as mock_image_captioning, \
         patch("server.indexing.image_text_search.run_text_search") as mock_text_search:

        # Act
        run_each_task(cwd, thread_killer, process_killer, callback, callback_args)

        # Assert
        if not thread_killer_set:
            mock_indexing.assert_called_once_with(cwd)
            mock_face_detection.assert_called_once_with(cwd, process_killer)
            mock_face_clustering.assert_called_once_with(cwd, thread_killer)
            mock_image_captioning.assert_called_once_with(cwd, process_killer)
            mock_text_search.assert_called_once_with(cwd, process_killer)
            if callback and callback_args:
                callback.assert_called_once_with(*callback_args)
        else:
            mock_indexing.assert_not_called()
            mock_face_detection.assert_not_called()
            mock_face_clustering.assert_not_called()
            mock_image_captioning.assert_not_called()
            mock_text_search.assert_not_called()
            if callback and callback_args:
                callback.assert_not_called()
