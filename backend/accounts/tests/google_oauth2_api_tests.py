import pytest
from unittest.mock import Mock
import requests
from requests.exceptions import RequestException
import requests_mock

from clicker.pipeline import set_social_image

@pytest.fixture
def backend_mock():
    # Mock the backend object
    backend = Mock()
    backend.name = 'google-oauth2'
    return backend

@pytest.fixture
def user_mock():
    # Mock the user object
    user = Mock()
    user.image = None
    return user

@pytest.fixture
def response_mock():
    response = Mock()
    response.get.return_value = 'https://example.com/profile_image.jpg'
    return response

def test_set_social_image_with_image_url(backend_mock, user_mock, response_mock):
    image_url = 'https://example.com/profile_image.jpg'
    user_mock.image = Mock()
    with requests_mock.Mocker() as m:
        m.get(image_url, text='image_data')
        set_social_image(backend_mock, {}, response_mock, user=user_mock)
        assert user_mock.image is not None

def test_set_social_image_with_no_image_url(backend_mock, user_mock, response_mock):
    response_mock.get.return_value = None
    set_social_image(backend_mock, {}, response_mock, user=user_mock)
    assert user_mock.image is None

def test_set_social_image_with_request_exception(backend_mock, user_mock, response_mock):
    image_url = 'https://example.com/profile_image.jpg'
    with requests_mock.Mocker() as m:
        m.get(image_url, exc=RequestException('Failed to fetch image'))
        set_social_image(backend_mock, {}, response_mock, user=user_mock)
        assert user_mock.image is None
