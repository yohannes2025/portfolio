from rest_framework import serializers

from .models import (
    ContactMessage,
    Education,
    Experience,
    Project,
    Service,
    Skill,
    Testimonial,
)


class ServiceSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        help_text='Title of the professional service.',
    )
    description = serializers.CharField(
        help_text='Description of the professional service.',
    )
    icon = serializers.CharField(
        help_text='Font Awesome icon class used to represent the service.',
    )
    order = serializers.IntegerField(
        help_text='Display order of the service in the portfolio.',
        required=False,
    )

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
    image = serializers.ImageField(
        help_text='Image associated with the portfolio project.',
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
            'title_de',
            'title_en',
            'description',
            'description_de',
            'description_en',
            'long_description',
            'long_description_de',
            'long_description_en',
            'image',
            'technologies',
            'github_url',
            'live_url',
            'featured',
            'date',
        ]

class SkillSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        help_text='Name of the technical skill.',
    )
    category = serializers.ChoiceField(
        choices=Skill.CATEGORY_CHOICES,
        help_text='Category to which the skill belongs.',
    )
    proficiency = serializers.IntegerField(
        min_value=0,
        max_value=100,
        help_text='Skill proficiency percentage from 0 to 100.',
    )
    icon = serializers.CharField(
        required=False,
        allow_blank=True,
        help_text='Optional icon identifier for the skill.',
    )
    order = serializers.IntegerField(
        required=False,
        help_text='Display order of the skill.',
    )

    class Meta:
        model = Skill
        fields = [
            'id',
            'name',
            'category',
            'proficiency',
            'icon',
            'order',
        ]
        read_only_fields = ['id']

class ContactSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        max_length=100,
        help_text='Name of the visitor submitting the contact message.',
    )
    email = serializers.EmailField(
        max_length=254,
        help_text='Email address where the visitor can be contacted.',
    )
    subject = serializers.CharField(
        max_length=200,
        min_length=5,
        help_text='Subject of the contact message; at least 5 characters.',
    )
    message = serializers.CharField(
        max_length=5000,
        help_text='Message submitted by the visitor; maximum 5,000 characters.',
    )
    website = serializers.CharField(
        max_length=200,
        required=False,
        allow_blank=True,
        write_only=True,
        help_text="Leave this hidden field empty.",
    )

    def validate(self, attrs):
        website = attrs.pop("website", "")
        if website:
            raise serializers.ValidationError(
                {"website": "Invalid submission."}
            )
        return attrs

    class Meta:
        model = ContactMessage
        fields = [
            'id',
            'name',
            'email',
            'subject',
            'message',
            'website',
            'created_at',
        ]
        read_only_fields = [
            'id',
            'created_at',
        ]

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id",
            "title",
            "company",
            "start_date",
            "current",
            "end_date",
            "description",
        ]
        read_only_fields = fields


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            "id",
            "degree",
            "institution",
            "start_year",
            "end_year",
        ]
        read_only_fields = fields

class TestimonialSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        read_only=True,
        allow_null=True,
    )

    class Meta:
        model = Testimonial
        fields = [
            'id',
            'name',
            'position',
            'company',
            'image',
            'rating',
            'feedback',
        ]
        read_only_fields = fields
