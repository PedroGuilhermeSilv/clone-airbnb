from rest_framework import serializers

from src.django_project.property_app.models import Property


class PropertiesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = (
            "id",
            "title",
            "image_url",
            "price_per_night",
        )
