from django.forms import ModelForm

from src.django_project.property_app.models import Property


class PropertyForm(ModelForm):
    class Meta:
        model = Property
        fields = (
            "title",
            "description",
            "price_per_night",
            "bedrooms",
            "bathrooms",
            "guests",
            "country",
            "image",
            "category",
        )
