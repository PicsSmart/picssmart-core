import pytest
from fastapi.testclient import TestClient
from server.routers.core_features_router import router

client = TestClient(router)

@pytest.mark.parametrize(
    "expected_status, expected_response",
    [
        (200, {"status": "up"}),
    ]
)
def test_health_check(expected_status, expected_response):
    # Act
    response = client.get("/health")

    # Assert
    assert response.status_code == expected_status
    assert response.json() == expected_response

@pytest.mark.parametrize(
    "path, expected_status",
    [
        ("/healh/", 404),
        ("/HEALTH", 404),
    ]
)
def test_health_check_edge_cases(path, expected_status):
    # Act
    response = client.get(path)

    # Assert
    assert response.status_code == expected_status

@pytest.mark.parametrize(
    "method, expected_status",
    [
        ("post", 405),
        ("put", 405),
        ("delete", 405),
    ]
)
def test_health_check_error_cases(method, expected_status):
    # Act
    response = client.request(method, "/health")

    # Assert
    assert response.status_code == expected_status
