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
    title = serializers.CharField(
        help_text='Title of the portfolio project.',
    )
    description = serializers.CharField(
        help_text='Short description of the project.',
    )
    long_description = serializers.CharField(
        help_text='Detailed description of the project.',
        required=False,
        allow_blank=True,
    )
    technologies = serializers.ListField(
        child=serializers.CharField(),
        help_text='List of technologies used to build the project.',
        required=False,
        default=list,
    )
    github_url = serializers.URLField(
        help_text='GitHub repository URL for the project.',
        required=False,
        allow_blank=True,
    )
    live_url = serializers.URLField(
        help_text='Live deployed URL for the project.',
        required=False,
        allow_blank=True,
    )
    featured = serializers.BooleanField(
        help_text='Whether the project is highlighted as a featured portfolio project.',
        required=False,
        default=False,
    )
    date = serializers.DateField(
        help_text='Date associated with the project.',
        required=False,
    )

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
