from django.urls import path

from src.django_project.property_app import views

urlpatterns = [
    path("", view=views.properties_list, name="properties_list"),
    path("create/", view=views.create_property, name="create_property"),
    path("<uuid:pk>/", view=views.property_detail, name="property_detail"),
    path("<uuid:pk>/book/", view=views.book_property, name="book_property"),
    path(
        "<uuid:pk>/reservations/",
        view=views.reservation_list,
        name="reservation_list",
    ),
    path(
        "<uuid:pk>/toggle-favorite/",
        view=views.toggle_favorite,
        name="toggle_favorite",
    ),
]
