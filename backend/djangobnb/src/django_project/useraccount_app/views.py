from django.http import JsonResponse
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
    user_info = get_google_user_info(token)
    print(user_info, "useralkçsdnvsçdklvnsdfklvjnsdflvkjnsdflvkjsndfvlksjnd")
    print(token)
    print(code)
    return JsonResponse(
        user_info,
    )
