from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from accounts.models import UserAccount as User


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password', 'image')


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'image', 'clicks')
        read_only_fields = ("id", "email")
