from ._base import *  # noqa: F403
import os

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("POSTGRES_DB", "my_db"),
        "USER": os.getenv("POSTGRES_USER", "my_user"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD", "my_password"),
        "HOST": os.getenv("POSTGRES_HOST", "db"),
        "PORT": os.getenv("POSTGRES_PORT", "5432"),
    }
}
