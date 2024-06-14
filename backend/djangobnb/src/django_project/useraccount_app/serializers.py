from rest_framework import serializers

from src.django_project.useraccount_app.models import User


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "name",
            "avatar_url",
        )
