from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build




# Função para obter informações do usuário
def get_google_user_info(access_token):
    credentials = Credentials(token=access_token)
    service = build("oauth2", "v2", credentials=credentials)
    return service.userinfo().get().execute()
