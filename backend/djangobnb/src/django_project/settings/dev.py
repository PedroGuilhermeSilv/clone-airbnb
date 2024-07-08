from ._base import *  # noqa: F403

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",  # noqa: F405
    },
}


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "simple": {
            "format": "[%(asctime)s] %(levelname)s %(message)s",
        },
        "verbose": {
            "format": "[%(asctime)s] %(levelname)s [%(name)s.%(funcName)s:%(lineno)d] %(message)s",
        },
    },
    "handlers": {
        "console": {
            "level": "WARN",
            "class": "logging.StreamHandler",
        }
    },
    "loggers": {
        "": {"handlers": ["console"], "level": "WARN", "propagate": True},
    },
}
