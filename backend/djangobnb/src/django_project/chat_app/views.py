from django.http import JsonResponse
from rest_framework.decorators import api_view

from src.django_project.chat_app.models import Conversation
from src.django_project.chat_app.serializers import (
    ConversationListSerialzier,
    ConversationMessageSerializer,
)
from src.django_project.useraccount_app.models import User


@api_view(["GET"])
def conversations_list(request):
    serializer = ConversationListSerialzier(request.user.conversations.all(), many=True)

    return JsonResponse(
        {
            "data": serializer.data,
        },
        safe=False,
    )


@api_view(["GET"])
def conversation_detail(request, pk):
    conversation = request.user.conversations.get(id=pk)
    conversation_serializer = ConversationListSerialzier(conversation, many=False)
    message_serializer = ConversationMessageSerializer(
        conversation.messages.all(),
        many=True,
    )

    return JsonResponse(
        {
            "conversation": conversation_serializer.data,
            "messages": message_serializer.data,
        },
        safe=False,
    )


@api_view(["GET"])
def start_conversation(request, user_id):
    if request.user.id == user_id:
        return JsonResponse(
            {"error": "You can't start a conversation with yourself"},
            status=400,
        )

    # Retrieve the target user by ID
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse(
            {"error": "User not found"},
            status=404,
        )

    # Check if a conversation between the two users already exists
    if Conversation.objects.filter(users=request.user).filter(users=user).exists():
        return JsonResponse(
            {"error": "Conversation already exists"},
            status=400,
        )

    # If no conversation exists, create a new one
    conversation = Conversation.objects.create()
    conversation.users.add(request.user, user)

    return JsonResponse(
        {
            "success": True,
            "conversation_id": conversation.id,
        },
    )
