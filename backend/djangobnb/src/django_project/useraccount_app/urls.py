from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from src.django_project.useraccount_app.views import (
    reservation_list,
    user_detail,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("user/", UserDetailsView.as_view(), name="user"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
    path("<uuid:pk>/", view=user_detail, name="user_detail"),
    path("myreservations/", view=reservation_list, name="reservations"),
]
