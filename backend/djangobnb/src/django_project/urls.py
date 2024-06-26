from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/properties/", include("src.django_project.property_app.urls")),
    path("api/auth/", include("src.django_project.useraccount_app.urls")),
    path("api/chat/", include("src.django_project.chat_app.urls")),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
