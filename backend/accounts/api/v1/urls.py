from dj_rest_auth.registration.views import RegisterView, ResendEmailVerificationView, VerifyEmailView
from dj_rest_auth.views import LoginView, LogoutView, PasswordChangeView, UserDetailsView
from django.urls import include, path

from accounts.api.v1.views import GoogleLogin, UserAPIView

app_name = 'v1'

urlpatterns = [
    path('register/', include([
        path('', RegisterView.as_view(), name='rest_register'),
        path('verify-email/<str:token>', VerifyEmailView.as_view(), name='rest_verify_email'),
        path('resend-email/', ResendEmailVerificationView.as_view(), name="rest_resend_email"),
    ])),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('user/', UserAPIView.as_view(), name='user_details'),
    path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
    path('google/login/', GoogleLogin.as_view(), name='google_login'),
]
