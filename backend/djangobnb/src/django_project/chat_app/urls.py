from django.urls import path

from src.django_project.chat_app import views

urlpatterns = [
    path("", view=views.conversations_list, name="conversations_list"),
    path("<uuid:pk>/", view=views.conversation_detail, name="conversation_detail"),
    path(
        "start/<uuid:user_id>/",
        view=views.start_conversation,
        name="start_conversation",
    ),
]
