# serializers.py
from rest_framework import serializers
from .models import Service, Project, ContactMessage


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'message']
