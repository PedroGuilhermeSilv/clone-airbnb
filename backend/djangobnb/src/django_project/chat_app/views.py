import base64
import json

from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from rest_framework.authentication import BaseAuthentication
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.exceptions import AuthenticationFailed

from src.django_project.chat_app.models import Conversation
from src.django_project.chat_app.serializers import (
    ConversationListSerialzier,
    ConversationMessageSerializer,
)
from src.django_project.useraccount_app.models import User


def decodificar_jwt(token):
    header, payload, signature = token.split(".")
    payload_decoded = base64.b64decode(payload).decode("utf-8")

    return json.loads(payload_decoded)


class UserAuthentication(BaseAuthentication):
    def authenticate(self, request):
        bearer = request.headers.get("Authorization")
        token = bearer.split(" ")[1] if bearer else None

        if not token:
            return None

        try:
            payload = decodificar_jwt(token)


        except Exception:
            raise AuthenticationFailed("Erro ao decodificar JWT")

        try:
            if payload.get("email"):
                user = User.objects.get(email=payload.get("email"))
            elif payload.get("user_id"):
                user = User.objects.get(id=payload.get("user_id"))
            else:
                raise AuthenticationFailed(
                    "Payload do JWT não contém identificador do usuário",
                )
        except ObjectDoesNotExist:
            raise AuthenticationFailed("Usuário não encontrado")

        return (
            user,
            None,
        )


@api_view(["GET"])
@authentication_classes([UserAuthentication])
def conversations_list(request):

    serializer = ConversationListSerialzier(request.user.conversations.all(), many=True)
    print(serializer.data)
    return JsonResponse(
        {
            "data": serializer.data,
        },
        safe=False,
    )


@api_view(["GET"])
@authentication_classes([UserAuthentication])
def conversation_detail(request, pk):
    conversation = request.user.conversations.get(id=pk)
    conversation_serializer = ConversationListSerialzier(conversation, many=False)
    message_serializer = ConversationMessageSerializer(
        conversation.messages.all(),
        many=True,
    )
    print(conversation_serializer.data)
    print(message_serializer.data)
    return JsonResponse(
        {
            "conversation": conversation_serializer.data,
            "messages": message_serializer.data,
        },
        safe=False,
    )


@api_view(["GET"])
@authentication_classes([UserAuthentication])
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
