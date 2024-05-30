from django.urls import path

from src.django_project.property_app import views

urlpatterns = [
    path("", view=views.properties_list, name="properties_list"),
]
