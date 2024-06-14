from rest_framework import serializers

from src.django_project.property_app.models import Property, Reservation
from src.django_project.useraccount_app.serializers import UserDetailSerializer


class PropertiesListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = (
            "id",
            "title",
            "image_url",
            "price_per_night",
        )


class PropertiesLisFavoritedtSerializer(serializers.ModelSerializer):
    favorited = serializers.SerializerMethodField()

    def get_favorited(self, obj):
        return obj.favorited.exists()

    class Meta:
        model = Property
        fields = (
            "id",
            "title",
            "image_url",
            "price_per_night",
            "favorited",
        )


class PropertiesDetailSerializer(serializers.ModelSerializer):
    landlord = UserDetailSerializer(read_only=True)

    class Meta:
        model = Property
        fields = (
            "id",
            "title",
            "image_url",
            "price_per_night",
            "image_url",
            "bedrooms",
            "bathrooms",
            "description",
            "guests",
            "landlord",
        )


class ReservationListSerializer(serializers.ModelSerializer):
    property = PropertiesListSerializer(read_only=True)

    class Meta:
        model = Reservation
        fields = (
            "id",
            "property",
            "start_date",
            "end_date",
            "number_of_nights",
            "total_price",
        )
