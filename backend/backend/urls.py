from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

api_urlpatterns = [
    path('auth/', include('accounts.api.urls', namespace='auth')),
    path('stories/', include('documents.api.urls', namespace='stories')),
    path('chatbot/', include('chatbot.api.urls', namespace='chatbot')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include((api_urlpatterns, 'api'), namespace='api')),

    *static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
]
