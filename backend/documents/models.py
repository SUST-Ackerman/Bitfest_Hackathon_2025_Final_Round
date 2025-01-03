from django.db import models

from core.models import TimeStampModel


class PDF(TimeStampModel):
    title = models.CharField(max_length=100)
    content = models.FileField(upload_to='stories/')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    is_public = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Doc(TimeStampModel):
    title = models.CharField(max_length=255, default='Untitled')
    content = models.TextField()


class DocAccess(TimeStampModel):
    doc = models.ForeignKey(Doc, on_delete=models.CASCADE, related_name='accesses')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='doc_accesses')
    can_edit = models.BooleanField(default=False)

    class Meta:
        unique_together = ('doc', 'user')
