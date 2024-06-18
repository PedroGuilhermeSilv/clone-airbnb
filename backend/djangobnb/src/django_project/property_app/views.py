from django.http import JsonResponse
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework_simplejwt.tokens import AccessToken

from src.django_project.property_app.forms import PropertyForm
from src.django_project.property_app.models import Property, Reservation
from src.django_project.property_app.serializers import (
    PropertiesDetailSerializer,
    PropertiesListSerializer,
    ReservationListSerializer,
)
from src.django_project.useraccount_app.models import User


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def properties_list(request):
    try:
        token = request.META["HTTP_AUTHORIZATION"].split("Bearer ")[1]
        token = AccessToken(token)
        user_id = token.payload["user_id"]
        user = User.objects.get(pk=user_id)
    except Exception:
        user = None

    properties = Property.objects.all()
    favorites = []

    if landloard_id := request.GET.get("landloard", ""):
        properties = properties.filter(landlord=landloard_id)

    if user:
        for property in properties:
            if user in property.favorited.all():
                favorites.append(property.id)
    if request.GET.get("favorites", ""):
        properties = properties.filter(id__in=favorites)

    serializer = PropertiesListSerializer(properties, many=True)
    return JsonResponse(
        {
            "data": serializer.data,
            "favorites": favorites,
        },
    )


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def property_detail(request, pk):

    serializer = PropertiesDetailSerializer(Property.objects.get(pk=pk))

    return JsonResponse(
        serializer.data,
    )


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def reservation_list(request, pk):
    properties = Property.objects.get(pk=pk)
    reservations = properties.reservations.all()
    serializer = ReservationListSerializer(reservations, many=True)

    return JsonResponse(
        serializer.data,
        safe=False,
    )


@api_view(["POST", "FILES"])
def create_property(request):
    form = PropertyForm(request.POST, request.FILES)
    if form.is_valid():
        data = form.save(commit=False)
        data.landlord = request.user
        data.save()
        return JsonResponse(
            {
                "data": "Property created successfully",
            },
            status=201,
        )
    return JsonResponse(
        {
            "error": form.errors,
        },
        status=400,
    )


@api_view(["POST"])
def book_property(request, pk):
    try:
        property = Property.objects.get(pk=pk)
        start_date = request.data.get("start_date")
        end_date = request.data.get("end_date")
        guests = request.data.get("guests")
        number_of_nights = request.data.get("number_of_nights")
        total_price = request.data.get("total_price", "")
        cretaed_by = request.user

        Reservation.objects.create(
            property=property,
            start_date=start_date,
            end_date=end_date,
            guests=guests,
            number_of_nights=number_of_nights,
            total_price=total_price,
            created_by=cretaed_by,
        )
    except Exception as e:
        return JsonResponse(
            {
                "error": str(e),
            },
            status=400,
        )
    return JsonResponse(
        {
            "data": "Property booked successfully",
        },
        status=201,
    )


@api_view(["POST"])
def toggle_favorite(request, pk):
    property = Property.objects.get(pk=pk)

    if request.user in property.favorited.all():
        property.favorited.remove(request.user)
        return JsonResponse(
            {
                "is_favorited": False,
            },
        )

    property.favorited.add(request.user)
    return JsonResponse(
        {
            "is_favorited": True,
        },
    )
