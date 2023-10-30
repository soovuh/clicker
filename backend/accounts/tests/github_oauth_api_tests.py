import pytest
from unittest.mock import Mock
import requests
from requests.exceptions import RequestException
import requests_mock

from clicker.pipeline import set_social_image

@pytest.fixture
def backend_mock_github():
    # Mock the backend object for GitHub
    backend = Mock()
    backend.name = 'github'
    return backend

@pytest.fixture
def user_mock():
    # Mock the user object
    user = Mock()
    user.image = None
    return user

@pytest.fixture
def response_mock_github():
    response = Mock()
    response.get.return_value = 'https://github.com/username.png'
    return response

def test_set_social_image_with_image_url_github(backend_mock_github, user_mock, response_mock_github):
    image_url = 'https://github.com/username.png'
    user_mock.image = Mock()
    with requests_mock.Mocker() as m:
        m.get(image_url, text='image_data')
        set_social_image(backend_mock_github, {}, response_mock_github, user=user_mock)
        assert user_mock.image is not None

def test_set_social_image_with_no_image_url_github(backend_mock_github, user_mock, response_mock_github):
    response_mock_github.get.return_value = None
    set_social_image(backend_mock_github, {}, response_mock_github, user=user_mock)
    assert user_mock.image is None

def test_set_social_image_with_request_exception_github(backend_mock_github, user_mock, response_mock_github):
    image_url = 'https://github.com/username.png'
    with requests_mock.Mocker() as m:
        m.get(image_url, exc=RequestException('Failed to fetch image'))
        set_social_image(backend_mock_github, {}, response_mock_github, user=user_mock)
        assert user_mock.image is None
