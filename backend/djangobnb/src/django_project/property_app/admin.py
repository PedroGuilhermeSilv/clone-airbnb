from django.contrib import admin

from src.django_project.property_app.models import Property, Reservation

admin.site.register(Reservation)
admin.site.register(Property)
