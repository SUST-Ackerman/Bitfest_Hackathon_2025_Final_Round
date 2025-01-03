from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.reverse import reverse_lazy

from accounts.api.v1.serializers import UserSerializer


class UserAPIView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class BaseSocialLoginView(SocialLoginView):
    authentication_classes = []
    client_class = OAuth2Client


class GoogleLogin(BaseSocialLoginView):
    adapter_class = GoogleOAuth2Adapter

    @property
    def callback_url(self):
        url = reverse_lazy('api:auth:google_callback')
        return self.request.build_absolute_uri(url)
