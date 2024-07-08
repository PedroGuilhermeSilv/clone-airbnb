from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from django.urls import path

from src.django_project.useraccount_app.user_redirect import UserRedirectView
from src.django_project.useraccount_app.views import (
    create_user,
    create_user_by_google,
    reservation_list,
    user_detail,
)

urlpatterns = [
    path("register/",create_user , name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("user/", UserDetailsView.as_view(), name="user"),
    path("token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
    path("<uuid:pk>/", view=user_detail, name="user_detail"),
    path("myreservations/", view=reservation_list, name="reservations"),
    path("~redirect/", view=UserRedirectView.as_view(), name="redirect"),
    path("google/", view=create_user_by_google, name="google"),
]
