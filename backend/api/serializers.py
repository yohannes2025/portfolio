from rest_framework import serializers

from .models import ContactMessage, Project, Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id',
            'title',
            'description',
            'icon',
            'order',
        ]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'description',
            'long_description',
            'image',
            'technologies',
            'github_url',
            'live_url',
            'featured',
            'date',
        ]


class ContactSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        help_text='Name of the visitor submitting the contact message.',
    )
    email = serializers.EmailField(
        help_text='Email address where the visitor can be contacted.',
    )
    message = serializers.CharField(
        help_text='Message submitted by the visitor.',
    )

    class Meta:
        model = ContactMessage
        fields = [
            'id',
            'name',
            'email',
            'message',
            'created_at',
        ]
        read_only_fields = [
            'id',
            'created_at',
        ]
