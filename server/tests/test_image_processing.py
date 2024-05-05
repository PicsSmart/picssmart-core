import pytest
from PIL import Image
from server.utils.image_processing import crop_image, convert_to_thumbnail
from server.conf import thumbnail_resolution

@pytest.mark.parametrize("top, right, bottom, left, expected_size", [
    (0, 100, 100, 0, (100, 100)),  # ID: test_happy_path_full_crop
    (10, 90, 90, 10, (80, 80)),    # ID: test_happy_path_partial_crop
    (50, 50, 50, 50, (0, 0)),      # ID: test_happy_path_edge_to_edge
    (0, 50, 50, 0, (50, 50)),      # ID: test_happy_path_half_crop
])
def test_crop_image_happy_path(top, right, bottom, left, expected_size):
    # Arrange
    original_image = Image.new('RGB', (100, 100))

    # Act
    cropped_image = crop_image(original_image, top, right, bottom, left)

    # Assert
    assert cropped_image.size == expected_size

@pytest.mark.parametrize("top, right, bottom, left", [
    (-10, 100, 100, 0),  # ID: test_edge_negative_top
    (0, 110, 100, 0),    # ID: test_edge_exceed_right
    (0, 100, 110, 0),    # ID: test_edge_exceed_bottom
    (-1, 100, 100, -1),  # ID: test_edge_negative_left_and_top
])
def test_crop_image_edge_cases(top, right, bottom, left):
    # Arrange
    original_image = Image.new('RGB', (100, 100))

    # Act
    cropped_image = crop_image(original_image, top, right, bottom, left)

    # Assert
    assert cropped_image is not None  # Checking if function handles out of bounds without crashing

@pytest.mark.parametrize("top, right, bottom, left, exception", [
    ("0", 100, 100, 0, TypeError),  # ID: test_error_non_int_top
    (0, "100", 100, 0, TypeError),  # ID: test_error_non_int_right
    (0, 100, "100", 0, TypeError),  # ID: test_error_non_int_bottom
    (0, 100, 100, "0", TypeError),  # ID: test_error_non_int_left
])
def test_crop_image_error_cases(top, right, bottom, left, exception):
    # Arrange
    original_image = Image.new('RGB', (100, 100))

    # Act & Assert
    with pytest.raises(exception):
        crop_image(original_image, top, right, bottom, left)
        
# Mock the rotate_image and crop_image functions as they are not defined in the provided snippet
def mock_rotate_image(image):
    return image

def mock_crop_image(image, top, right, bottom, left):
    return image.crop((left, top, image.width - right, image.height - bottom))

@pytest.fixture
def sample_image():
    # Create a simple image for testing
    img = Image.new('RGB', (100, 100), color = 'red')
    img.save('test.jpg')
    yield 'test.jpg'
    img.close()

@pytest.mark.parametrize("top, right, bottom, left, expected_size", [
    (10, 10, 10, 10, (80, 80)),  # ID: T1 - Normal cropping
    (0, 0, 0, 0, (100, 100)),    # ID: T2 - No cropping
])
def test_convert_to_thumbnail_cropping(sample_image, top, right, bottom, left, expected_size, monkeypatch):
    monkeypatch.setattr('server.utils.image_processing.rotate_image', mock_rotate_image)
    monkeypatch.setattr('server.utils.image_processing.crop_image', mock_crop_image)

    # Act
    result_stream = convert_to_thumbnail(sample_image, top, right, bottom, left)
    result_image = Image.open(result_stream)

    # Assert
    assert result_image.size == expected_size
    testImageTeardown(sample_image)

def testImageTeardown(sample_image):
    import os
    os.remove(sample_image)
