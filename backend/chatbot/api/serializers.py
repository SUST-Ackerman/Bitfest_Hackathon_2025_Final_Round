from rest_framework import serializers

from documents.models import Doc, DocAccess


class EditDocumentAISerializer(serializers.Serializer):
    command = serializers.CharField(max_length=255, write_only=True)
