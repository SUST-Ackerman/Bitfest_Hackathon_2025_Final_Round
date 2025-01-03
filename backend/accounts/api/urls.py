from allauth.socialaccount.providers.google.views import oauth2_callback as google_callback_view
from django.urls import include, path

app_name = 'auth'

urlpatterns = [
    path('v1/', include('accounts.api.v1.urls', namespace='v1')),

    # These URLs are used to handle the callback from social login providers.
    # Modifying these URLs may break the social login functionality.
    path('google/login/callback/', google_callback_view, name='google_callback'),
]
