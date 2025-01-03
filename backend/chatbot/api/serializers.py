from rest_framework import serializers

from chatbot.models import TrainingData


class EditDocumentAISerializer(serializers.Serializer):
    command = serializers.CharField(max_length=255, write_only=True)


class TrainingDataSerializer(serializers.ModelSerializer):
    trainer = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = TrainingData
        fields = '__all__'
