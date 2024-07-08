import base64
import json

import requests
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from src.django_project.useraccount_app.models import User


# Função para obter informações do usuário
def get_google_user_info(access_token):
    credentials = Credentials(token=access_token)
    service = build("oauth2", "v2", credentials=credentials)
    return service.userinfo().get().execute()


def get_google_access_token(code):
    url = "https://oauth2.googleapis.com/token"

    data = {
        "code": code,
        "client_id": settings.CLIENT_ID,
        "client_secret": settings.CLIENT_SECRET,
        "redirect_uri": settings.REDIRECT_URI,
        "grant_type": "authorization_code",
    }
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    response = requests.post(url, data=data, headers=headers)
    print(response.json())
    return response.json() if response.status_code == 200 else None




def decodificar_jwt(token):
    _, payload, _ = token.split(".")
    payload_decoded = base64.b64decode(payload).decode("utf-8")

    return json.loads(payload_decoded)


class UserAuthentication(BaseAuthentication):
    def authenticate(self, request):
        bearer = request.headers.get("Authorization")
        token = bearer.split(" ")[1] if bearer else None

        if not token:
            return None

        try:
            payload = decodificar_jwt(token)


        except Exception:
            raise AuthenticationFailed("Erro ao decodificar JWT")

        try:
            if payload.get("email"):
                user = User.objects.get(email=payload.get("email"))
            elif payload.get("user_id"):
                user = User.objects.get(id=payload.get("user_id"))
            else:
                raise AuthenticationFailed(
                    "Payload do JWT não contém identificador do usuário",
                )
        except ObjectDoesNotExist:
            raise AuthenticationFailed("Usuário não encontrado")

        return (
            user,
            None,
        )
