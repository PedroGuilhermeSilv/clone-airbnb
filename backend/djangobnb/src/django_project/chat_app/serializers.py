from rest_framework import serializers

from src.django_project.chat_app.models import Conversation
from src.django_project.useraccount_app.serializers import UserDetailSerializer


class ConversationListSerialzier(serializers.ModelSerializer):
    users = UserDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = (
            "id",
            "modified_at",
            "users",
        )


class ConversationDetailSerializer(serializers.ModelSerializer):
    users = UserDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = (
            "id",
            "modified_at",
            "users",
        )
