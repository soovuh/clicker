from rest_framework.viewsets import ModelViewSet
from accounts.models import UserAccount as User
from accounts.serializers import UserModelSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response

class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    http_method_names = ["get", "post", 'put', 'patch']


