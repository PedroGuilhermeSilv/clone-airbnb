import requests
from django.conf import settings
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build


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
    print(response.status_code)
    print(response.json())
    return response.json() if response.status_code == 200 else None
