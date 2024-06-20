import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

from src.django_project.chat_app import routing
from src.django_project.chat_app.token_auth import TokenAuthMiddleware

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    f'django_project.settings.{os.getenv("DJANGO_ENV", "dev")}',
)

application = get_asgi_application()


application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": TokenAuthMiddleware(
            URLRouter(
                routing.websocket_urlpatterns,
            ),
        ),
    },
)
