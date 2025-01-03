from django.urls import path

from chatbot.api.views import RefineDocumentAPIView, DataTrainAPIView, TrainingReviewAPIView, TrainingDataDetailAPIView

app_name = 'chatbot'

urlpatterns = [
    path('refine-doc/<int:pk>', RefineDocumentAPIView.as_view(), name='update-document'),
    path('train-data/', DataTrainAPIView.as_view(), name='train-data'),
    path('training-data/', TrainingReviewAPIView.as_view(), name='training-data'),
    path('training-data/<int:pk>/', TrainingDataDetailAPIView.as_view(), name='training-data-details'),
]
