from django.http import JsonResponse
from src.django_project.chat_app.serializers import ConversationListSerialzier
from rest_framework.decorators import api_view


@api_view(["GET"])
def conversations_list(request):
    serializer = ConversationListSerialzier(request.user.conversations.all(), many=True)

    return JsonResponse(
        {
            "data": serializer.data,
        },
    )
