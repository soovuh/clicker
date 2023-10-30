from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.views.static import serve
from rest_framework.routers import DefaultRouter
from accounts.views import UserModelViewSet

router = DefaultRouter()
router.register(r'users', UserModelViewSet)


urlpatterns = [
    path('api/info/', include(router.urls)),
    path('api/admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/auth/', include('djoser.social.urls')),
    re_path(r'^media/(?P<path>.*)$', serve,
            {'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,
            {'document_root': settings.STATIC_ROOT}),
]


urlpatterns += [re_path(r'^,*',
                        TemplateView.as_view(template_name='index.html'))]
