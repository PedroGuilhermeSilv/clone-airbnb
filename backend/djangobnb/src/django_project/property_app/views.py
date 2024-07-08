from django.http import JsonResponse
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

from src.django_project.property_app.forms import PropertyForm
from src.django_project.property_app.models import Property, Reservation
from src.django_project.property_app.serializers import (
    PropertiesDetailSerializer,
    PropertiesListSerializer,
    ReservationListSerializer,
)
from src.django_project.useraccount_app.auth import UserAuthentication, decodificar_jwt
from src.django_project.useraccount_app.models import User


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def properties_list(request):
    try:
        token = request.META["HTTP_AUTHORIZATION"].split("Bearer ")[1]
        token = decodificar_jwt(token)

        if user_email := token.get("email"):
            user = User.objects.get(email=user_email)
        elif user_id := token.get("user_id"):
            user = User.objects.get(id=user_id)
    except Exception:
        user = None

    properties = Property.objects.all()
    favorites = []

    category = request.GET.get("category", "")

    if check_in := request.GET.get("checkIn", ""):
        exact_matches = Reservation.objects.filter(
            start_date=check_in,
        ) | Reservation.objects.filter(
            end_date=check_in,
        )

        overlapping_matches = Reservation.objects.filter(
            start_date__lte=check_in,
            end_date__gt=check_in,
        )
        all_matches = [
            reservaiton.property.id
            for reservaiton in exact_matches | overlapping_matches
        ]

        properties = properties.exclude(id__in=all_matches)
    if landloard_id := request.GET.get("landloard", ""):
        properties = properties.filter(landlord=landloard_id)
    if guests := request.GET.get("guests", ""):
        properties = properties.filter(guests__gte=guests)
    if bedrooms := request.GET.get("bedrooms", ""):
        properties = properties.filter(bedrooms__gte=bedrooms)
    if bathrooms := request.GET.get("bathrooms", ""):
        properties = properties.filter(bathrooms__gte=bathrooms)
    if country := request.GET.get("country", ""):
        properties = properties.filter(country=country)
    if category and category != "undefined":
        properties = properties.filter(category=category)
    print(user)
    if user:
        for property in properties:
            if user in property.favorited.all():
                favorites.append(property.id)
    if request.GET.get("favorites", ""):
        properties = properties.filter(id__in=favorites)

    serializer = PropertiesListSerializer(properties, many=True)
    print(serializer.data)

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
    print(serializer.data)
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
@authentication_classes([UserAuthentication])
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
@authentication_classes([UserAuthentication])
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
@authentication_classes([UserAuthentication])
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
