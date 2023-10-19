from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from accounts.models import UserAccount as User



class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')