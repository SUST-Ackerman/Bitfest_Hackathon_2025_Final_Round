from django.urls import path

from chatbot.api.views import RefineDocumentAPIView

app_name = 'chatbot'

urlpatterns = [
    path('refine-doc/<int:pk>', RefineDocumentAPIView.as_view(), name='update-document'),
]
