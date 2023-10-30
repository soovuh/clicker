import os
import requests
from django.core.files.base import ContentFile

def set_social_image(backend, details, response, *args, **kwargs):
    user = kwargs['user']
    if user:
        if not user.image:
            if backend.name == 'google-oauth2':
                image_url = response.get('picture')
            elif backend.name == 'github':
                image_url = response.get('avatar_url')
            if image_url:
                try:
                    response = requests.get(image_url)
                    response.raise_for_status()

                    image_content = ContentFile(response.content)
                    image_full_name = image_url.split("/")[-1]

                    image_name, image_extension = os.path.splitext(image_full_name)
                    if not image_extension:
                        image_extension = '.png'

                    image_content.name = f'{image_name}{image_extension}'
                    user.image.save(image_content.name, image_content)
                    user.save()
                except requests.exceptions.RequestException as e:
                    print(e)
    return None