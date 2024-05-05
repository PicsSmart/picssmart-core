import pytest
from fastapi.testclient import TestClient
from server.routers.core_features_router import router
from unittest.mock import patch, MagicMock
import numpy as np
from server.indexing.face_clustering import has_faces, to_faces, get_matching

client = TestClient(router)

@pytest.mark.parametrize("document, expected, test_id", [
    ({"faceEncodings": [1, 2, 3]}, True, "test_id_01"),
    ({"faceEncodings": [1]}, True, "test_id_02"),
    ({"faceEncodings": []}, False, "test_id_03"),
    ({}, False, "test_id_04"),
])
def test_has_faces(document, expected, test_id):
    result = has_faces(document)

    assert result == expected, f"Failed {test_id}"

# Test cases for the happy path
@pytest.mark.parametrize("document, expected_output", [
    (
        {
            "_id": 1,
            "faceEncodings": [[0.1, 0.2], [0.3, 0.4]],
            "faces": ["face1.jpg", "face2.jpg"],
            "path": "/images"
        },
        [
            {"_id": "1", "face": "face1.jpg", "enc": [0.1, 0.2], "path": "/images"},
            {"_id": "1", "face": "face2.jpg", "enc": [0.3, 0.4], "path": "/images"}
        ]
    ),
    (
        {
            "_id": "abc123",
            "faceEncodings": [[0.5]],
            "faces": ["face3.jpg"],
            "path": "/images"
        },
        [
            {"_id": "abc123", "face": "face3.jpg", "enc": [0.5], "path": "/images"}
        ]
    )
], ids=["multiple_faces", "single_face"])
def test_to_faces_happy_path(document, expected_output):
    # Act
    result = to_faces(document)

    # Assert
    assert result == expected_output

# Test cases for edge cases
@pytest.mark.parametrize("document, expected_output", [
    (
        {
            "_id": 2,
            "faceEncodings": [],
            "faces": [],
            "path": "/empty"
        },
        []
    )
], ids=["empty_lists"])
def test_to_faces_edge_cases(document, expected_output):
    # Act
    result = to_faces(document)

    # Assert
    assert result == expected_output

# Test cases for error cases
@pytest.mark.parametrize("document, exception", [
    (
        {
            "_id": 3,
            "faceEncodings": [[0.1, 0.2]],
            "faces": ["face1.jpg"],
            # 'path' key is missing
        },
        KeyError
    ),
    (
        {
            # '_id' key is missing
            "faceEncodings": [[0.1, 0.2]],
            "faces": ["face1.jpg"],
            "path": "/images"
        },
        KeyError
    ),
    (
        {
            "_id": 4,
            "faceEncodings": [[0.1, 0.2]],
            # 'faces' key is missing
            "path": "/images"
        },
        KeyError
    )
], ids=["missing_path", "missing_id", "missing_faces"])
def test_to_faces_error_cases(document, exception):
    # Act & Assert
    with pytest.raises(exception):
        to_faces(document)

# Test data for happy path scenarios
@pytest.mark.parametrize("this, that, metric, threshold, expected", [
    ({"enc": [1, 0]}, {"enc": [0.5, 0.5]}, "cosine", 0.1, None),  # ID: HP-1
    ({"enc": [1, 0]}, {"enc": [1, 0]}, "cosine", 1.0, {"enc": [1, 0]}),  # ID: HP-2
    ({"enc": [3, 4]}, {"enc": [0, 0]}, "euclidean", 5, {"enc": [3, 4]}),  # ID: HP-3
])
def test_get_matching_happy_path(this, that, metric, threshold, expected):
    # Act
    result = get_matching(this, that, metric, threshold)

    # Assert
    assert result == expected

# Test data for edge cases
@pytest.mark.parametrize("this, that, metric, threshold, expected", [
    ({"enc": [0, 0]}, {"enc": [0, 0]}, "cosine", 0.0, {"enc": [0, 0]}),  # ID: EC-1
    ({"enc": [0, 0]}, {"enc": [0, 0]}, "euclidean", 0.0, {"enc": [0, 0]}),  # ID: EC-2
    ({"enc": [1, 1]}, {"enc": [1, 1]}, "cosine", 0.0, {"enc": [1, 1]}),  # ID: EC-3
    ({"enc": [1, 1]}, {"enc": [1, 1]}, "euclidean", 0.0, {"enc": [1, 1]})  # ID: EC-4
])
def test_get_matching_edge_cases(this, that, metric, threshold, expected):
    # Act
    result = get_matching(this, that, metric, threshold)

    # Assert
    assert result == expected
