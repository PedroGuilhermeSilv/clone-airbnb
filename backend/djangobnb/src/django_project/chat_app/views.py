from django.http import JsonResponse
from rest_framework.decorators import api_view

from src.django_project.chat_app.serializers import ConversationListSerialzier


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
    serializer = ConversationListSerialzier(conversation, many=False)

    return JsonResponse(
        {
            "conversation": serializer.data,
        },
        safe=False,
    )
