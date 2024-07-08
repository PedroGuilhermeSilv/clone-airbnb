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


class RequestCreateUsers(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    password1 = serializers.CharField()
    password2 = serializers.CharField()

    def validate(self, attrs):
            super_validate = super().validate(attrs)
            password1 = attrs.get("password1")
            password2 = attrs.get("password2")
            if password1 != password2:
                raise serializers.ValidationError(
                    {
                        "password": ["As senhas não coincidem"],
                    },
                )
            return super_validate
