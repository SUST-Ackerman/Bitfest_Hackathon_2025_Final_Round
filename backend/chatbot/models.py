from django.db import models

from core.models import TimeStampModel


class TrainingData(TimeStampModel):
    banglish = models.TextField()
    bangla = models.TextField()
    approved = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)
    trainer = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='training_data')
