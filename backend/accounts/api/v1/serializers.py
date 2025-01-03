from django.contrib.auth.models import User
from rest_framework import serializers

from accounts.models import BillingProfile


class UserSerializer(serializers.ModelSerializer):
    coins = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'coins')
        read_only_fields = ('id', 'coins')
        extra_kwargs = {
            'first_name': {'required': True},
            'email': {'required': True},
        }

    def get_coins(self, obj):
        return BillingProfile.objects.get_or_create(user=obj)[0].coins


class AnonymousLoginSerializer(serializers.Serializer):
    device_id = serializers.CharField()
    firebase_push_token = serializers.CharField(required=False)
