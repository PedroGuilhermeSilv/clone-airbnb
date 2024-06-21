from django.http import JsonResponse
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

from src.django_project.property_app.serializers import ReservationListSerializer
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
