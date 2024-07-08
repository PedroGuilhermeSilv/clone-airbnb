from django.urls import path

from src.django_project.chat_app import consumers

websocket_urlpatterns = [
    path("ws/<str:room_name>/", consumers.ChatConsumer.as_asgi()),
]

