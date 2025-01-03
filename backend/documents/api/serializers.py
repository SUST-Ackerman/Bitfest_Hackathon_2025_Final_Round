from rest_framework import serializers

from documents.models import PDF, Doc, DocAccess


class StorySerializer(serializers.ModelSerializer):
    user = serializers.CurrentUserDefault()

    class Meta:
        model = PDF
        fields = ('id', 'title', 'content', 'user', 'is_public')


class DocSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doc
        fields = ('id', 'title', 'content')

    def create(self, validated_data):
        user = self.context['request'].user
        doc = Doc.objects.create(**validated_data)
        DocAccess.objects.create(doc=doc, user=user, can_edit=True)
        return doc

    def update(self, instance, validated_data):
        user = self.context['request'].user
        query = DocAccess.objects.filter(doc=instance, user=user)
        if not query.exists() or not query.first().can_edit:
            raise serializers.ValidationError('You do not have permission to edit this document.')
        return super().update(instance, validated_data)


class DocAccessSerializer(serializers.ModelSerializer):
    user = serializers.CurrentUserDefault()
    doc = DocSerializer()

    class Meta:
        model = DocAccess
        fields = ('id', 'doc', 'user', 'can_edit')
        read_only_fields = ('doc', 'can_edit')

    def create(self, validated_data):
        doc_data = validated_data.pop('doc')
        doc, _ = Doc.objects.get_or_create(**doc_data)
        doc_access = DocAccess.objects.create(doc=doc, **validated_data)
        return doc_access
