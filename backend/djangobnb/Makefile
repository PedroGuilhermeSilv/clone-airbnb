runserver:
	@pdm run python manage.py runserver 0.0.0.0:8000

makemigrations:
	@pdm run python manage.py makemigrations

migrate:
	@pdm run python manage.py migrate


start_celery:
	@pdm run celery -A src.django_project.externals.celery worker --loglevel=info