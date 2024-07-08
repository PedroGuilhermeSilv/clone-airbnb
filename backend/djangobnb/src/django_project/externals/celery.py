import os

from celery import Celery

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    f'src.django_project.settings.{os.getenv("DJANGO_ENV", "dev")}',
)
app = Celery("tasks", broker="redis://redis:6379/0")

app.autodiscover_tasks()
