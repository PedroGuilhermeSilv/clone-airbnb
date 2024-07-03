from django.http import JsonResponse
from django_project.chat_app.views import UserAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

from src.django_project.property_app.serializers import ReservationListSerializer
from src.django_project.useraccount_app.auth import (
    get_google_access_token,
    get_google_user_info,
)
from src.django_project.useraccount_app.models import User
from src.django_project.useraccount_app.serializers import (
    UserDetailSerializer,
)


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def user_detail(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserDetailSerializer(user)

    return JsonResponse(
        serializer.data,
    )


@api_view(["GET"])
@authentication_classes([UserAuthentication])
def reservation_list(request):
    reservations = request.user.reservations.all()

    serializer = ReservationListSerializer(reservations, many=True)

    return JsonResponse(
        serializer.data,
        safe=False,
    )


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def create_user_by_google(request):
    code = request.query_params.get("code")
    token = get_google_access_token(code)
    print(token)
    if token is None:
        return JsonResponse(
            {
                "error": "Invalid code",
            },
            status=400,
        )
    user_info = get_google_user_info(token["access_token"])
    print(user_info)
    if user_info:
        print("Tentando cadastrar")
        user = User.objects.get_or_create(
            email=user_info["email"],
            name=user_info["name"],
        )
        print("Pessoa cadastrada")

    return JsonResponse(
        {
            "token": token["id_token"],
            "user_id": User.objects.get(email=user_info["email"]).id,
            "refresh_token": token["refresh_token"],
        },
        status=200,
    )
