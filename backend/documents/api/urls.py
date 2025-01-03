from django.urls import path

from chatbot.api.views import RefineDocumentAPIView, EditDocumentAIAPIView
from documents.api.views import StoryListAPIView, DocAccessListAPIView, DocDetailAPIView, DocListAPIView

app_name = 'stories'

urlpatterns = [
    path('', StoryListAPIView.as_view(), name='story-list'),
    path('docs/', DocListAPIView.as_view(), name='doc-list'),
    path('docs/accesses/', DocAccessListAPIView.as_view(), name='doc-list'),
    path('docs/<int:pk>/', DocDetailAPIView.as_view(), name='doc-detail'),
    path('docs/<int:pk>/refine/', RefineDocumentAPIView.as_view(), name='doc-refine'),
    path('docs/<int:pk>/ai/', EditDocumentAIAPIView.as_view(), name='doc-edit-ai'),
]
