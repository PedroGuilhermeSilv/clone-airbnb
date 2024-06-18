from django.contrib import admin

from src.django_project.chat_app.models import Conversation, ConversationMessage

admin.site.register(Conversation)
admin.site.register(ConversationMessage)
