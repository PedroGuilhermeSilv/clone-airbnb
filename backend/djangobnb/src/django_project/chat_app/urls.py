from django.urls import path

from src.django_project.chat_app import views

urlpatterns = [
    path("", view=views.conversations_list, name="conversations_list"),
]
