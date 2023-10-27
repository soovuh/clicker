import pytest

from django.contrib.auth.tokens import default_token_generator
from rest_framework import status
from djoser import utils

from accounts.models import UserAccount as User

@pytest.fixture
def api_client():
   from rest_framework.test import APIClient
   return APIClient()


def create_user(api_client):
    user_create_data = {
        'email': 'test@example.com',
        'name': 'Test User',
        'password': 'testpassword123',
        're_password': 'testpassword123',
    }
    url = '/api/auth/users/'
    response = api_client.post(url, user_create_data)
    return response

def activate_user(api_client, user):
    email_context = {
        "uid": utils.encode_uid(user.pk),
        "token": default_token_generator.make_token(user)
    }
    url = '/api/auth/users/activation/'
    response = api_client.post(url, email_context)
    return response

def create_and_activate_user(api_client):
    create_response = create_user(api_client)
    user = User.objects.get(id=create_response.data['id'])
    response = activate_user(api_client, user)
    if response.status_code == status.HTTP_204_NO_CONTENT:
        return user
    else:
        return None
    
def login_user(api_client, password):
    login_data = {
        'email': 'test@example.com',
        'password': password,
    }
    url = '/api/auth/jwt/create/'
    response = api_client.post(url, login_data)
    return response


# Djoser API tests
@pytest.mark.django_db
def test_create_user(api_client):
    response = create_user(api_client)
    assert response.status_code == status.HTTP_201_CREATED
    

@pytest.mark.django_db
def test_activate_user(api_client):
    create_response = create_user(api_client)
    user = User.objects.get(id=create_response.data['id'])
    response = activate_user(api_client, user)
    assert response.status_code == status.HTTP_204_NO_CONTENT


@pytest.mark.django_db
def test_login_user(api_client):
    user = create_and_activate_user(api_client)
    response = login_user(api_client, 'testpassword123')
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_auth_check(api_client):
    create_and_activate_user(api_client)
    token = login_user(api_client, "testpassword123").data["access"]
    url = '/api/auth/jwt/verify/'
    response = api_client.post(url, {"token": token})
    assert response.status_code == status.HTTP_200_OK

    
@pytest.mark.django_db
def test_refresh_token(api_client):
    create_and_activate_user(api_client)
    refresh = login_user(api_client, "testpassword123").data["refresh"]
    url = '/api/auth/jwt/refresh/'
    response = api_client.post(url, {"refresh": refresh})
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_reset_password_send(api_client):
    user = create_and_activate_user(api_client)
    url = '/api/auth/users/reset_password/'
    response = api_client.post(url, {"email": user.email})
    assert response.status_code == status.HTTP_204_NO_CONTENT


@pytest.mark.django_db
def test_reset_password_confirm(api_client):
    user = create_and_activate_user(api_client)
    email_context = {
        "uid": utils.encode_uid(user.pk),
        "token": default_token_generator.make_token(user),
        "new_password": "testpassword1234",
        "re_new_password": "testpassword1234"
    }
    url = '/api/auth/users/reset_password_confirm/'
    response = api_client.post(url, email_context)
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert login_user(api_client, "testpassword123").status_code == status.HTTP_401_UNAUTHORIZED
    assert login_user(api_client, "testpassword1234").status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_load_user(api_client):
    user = create_and_activate_user(api_client)
    token = login_user(api_client, "testpassword123").data["access"]
    url = "/api/auth/users/me/"
    headers = {
        "Authorization": f'JWT {token}'
    }
    response = api_client.get(url, headers=headers)
    assert response.status_code == status.HTTP_200_OK


# UserModelViewSet tests
@pytest.mark.django_db
def test_load_user_extended(api_client):
    user = create_and_activate_user(api_client)
    token = login_user(api_client, "testpassword123").data["access"]
    url = f'/api/info/users/{user.id}/'
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data["id"] == user.id
    assert response.data["email"] == user.email
    assert response.data["name"] == user.name
    assert response.data["clicks"] == user.clicks


@pytest.mark.django_db
def test_user_list(api_client):
    url = f'/api/info/users/'
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_change_user_clicks(api_client):
    user = create_and_activate_user(api_client)
    token = login_user(api_client, "testpassword123").data["access"]
    url = f'/api/info/users/{user.id}/'
    headers = {
        "Authorization": f'JWT {token}'
    }
    response = api_client.patch(url, {"clicks": 100}, headers=headers)
    assert response.status_code == status.HTTP_200_OK
    assert response.data["clicks"] != user.clicks
    assert response.data["clicks"] == 100


@pytest.mark.django_db
def test_change_user_name(api_client):
    user = create_and_activate_user(api_client)
    token = login_user(api_client, "testpassword123").data["access"]
    url = f'/api/info/users/{user.id}/'
    headers = {
        "Authorization": f'JWT {token}'
    }
    response = api_client.patch(url, {"name": "newtestname"}, headers=headers)
    assert response.status_code == status.HTTP_200_OK
    assert response.data["name"] != user.name
    assert response.data["name"] == "newtestname"

