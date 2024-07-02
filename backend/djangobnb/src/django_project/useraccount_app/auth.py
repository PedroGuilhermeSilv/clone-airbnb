import requests
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from django.conf import settings


# Função para obter informações do usuário
def get_google_user_info(access_token):
    credentials = Credentials(token=access_token)
    service = build("oauth2", "v2", credentials=credentials)
    return service.userinfo().get().execute()


def get_google_access_token(code):
    url = "https://oauth2.googleapis.com/token"
    data = {
        "code": code,
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "redirect_uri": settings.REDIRECT_URI,
        "grant_type": "authorization_code",
    }
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    response = requests.post(url, data=data, headers=headers)
    return response.json()["access_token"] if response.status_code == 200 else None
