from rest_framework import serializers

from src.django_project.chat_app.models import Conversation, ConversationMessage
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


class ConversationMessageSerializer(serializers.ModelSerializer):
    sent_to = UserDetailSerializer(read_only=True, many=False)
    created_by = UserDetailSerializer(read_only=True, many=False)

    class Meta:
        model = ConversationMessage
        fields = (
            "id",
            "conversation",
            "body",
            "sent_to",
            "created_by",
            "modified_at",
        )
        read_only_fields = (
            "created_by",
            "modified_at",
        )
