import logging

from django.conf import settings
from django.core.mail import EmailMessage
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiResponse,
    extend_schema,
)
from rest_framework.generics import CreateAPIView, ListAPIView

from .models import (
    ContactMessage,
    Education,
    Experience,
    Project,
    Service,
    Skill,
    Testimonial,
)
from .serializers import (
    ContactSerializer,
    EducationSerializer,
    ExperienceSerializer,
    ProjectSerializer,
    ServiceSerializer,
    SkillSerializer,
    TestimonialSerializer,
)

logger = logging.getLogger(__name__)


@extend_schema(
    summary='List services',
    description=(
        'Returns the professional services offered by Yohannes Tekle.'
    ),
    responses={
        200: OpenApiResponse(
            response=ServiceSerializer(many=True),
            description='Returns the list of professional services.',
        ),
    },
    tags=['services'],
)
class ServiceListView(ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


@extend_schema(
    summary='List projects',
    description=(
        'Returns the portfolio projects developed by Yohannes Tekle.'
    ),
    responses={
        200: OpenApiResponse(
            response=ProjectSerializer(many=True),
            description='Returns the list of portfolio projects.',
        ),
    },
    tags=['projects'],
)
class ProjectListView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


@extend_schema(
    summary='List technical skills',
    description=(
        'Returns the technical skills displayed in the portfolio, '
        'including their categories, proficiency percentages, '
        'and display order.'
    ),
    responses={
        200: OpenApiResponse(
            response=SkillSerializer(many=True),
            description='Returns the list of technical skills.',
        ),
    },
    tags=['skills'],
)
class SkillListView(ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


@extend_schema(
    summary='Send contact message',
    description=(
        'Allows visitors to submit a contact message through the portfolio. '
        'The request requires a name, a valid email address, a subject of '
        'at least five characters, and a message. '
        'A successful submission returns the created contact message with '
        'its generated ID and creation timestamp.'
    ),
    responses={
        201: OpenApiResponse(
            response=ContactSerializer,
            description='Contact message created successfully.',
            examples=[
                OpenApiExample(
                    'Successful contact message',
                    value={
                        'id': 1,
                        'name': 'Test Visitor',
                        'email': 'visitor@example.com',
                        'subject': 'Portfolio project enquiry',
                        'message': (
                            'I would like to discuss a software project.'
                        ),
                        'created_at': '2026-10-07T10:30:00Z',
                    },
                    response_only=True,
                ),
            ],
        ),
        400: OpenApiResponse(
            response=OpenApiTypes.OBJECT,
            description='Invalid contact message data.',
            examples=[
                OpenApiExample(
                    'Validation error',
                    value={
                        'email': [
                            'Enter a valid email address.',
                        ],
                        'subject': [
                            'Ensure this field has at least 5 characters.',
                        ],
                    },
                    response_only=True,
                ),
            ],
        ),
    },
    tags=['contact'],
)
class ContactCreateView(CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactSerializer

    def perform_create(self, serializer):
        contact = serializer.save()

        if not settings.CONTACT_EMAIL or not settings.DEFAULT_FROM_EMAIL:
            logger.warning(
                "Contact notification email is not configured; "
                "saved contact message id=%s",
                contact.pk,
            )
            return

        # 1. Notification email to you
        notification_email = EmailMessage(
            subject=f"[Portfolio contact] {contact.subject}",
            body=(
                f"New portfolio contact enquiry\n\n"
                f"Name: {contact.name}\n"
                f"Email: {contact.email}\n"
                f"Subject: {contact.subject}\n\n"
                f"Message:\n{contact.message}\n"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.CONTACT_EMAIL],
            reply_to=[contact.email],
        )

        # 2. Confirmation email to the visitor
        confirmation_email = EmailMessage(
            subject="Thank you for reaching out!",
            body=(
                f"Hi {contact.name},\n\n"
                f"Thank you for reaching out via my portfolio. I have received your "
                f"message regarding '{contact.subject}' and will get back to you shortly!\n\n"
                f"Best regards,\n"
                f"Yohannes Tekle\n"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[contact.email],
        )

        try:
            notification_email.send(fail_silently=False)
            logger.info("Sent contact notification email for id=%s", contact.pk)
        except Exception as e:
            logger.exception("Failed to send notification email for id=%s: %s", contact.pk, str(e))

        try:
            confirmation_email.send(fail_silently=False)
            logger.info("Sent confirmation email to visitor for id=%s", contact.pk)
        except Exception as e:
            logger.exception("Failed to send confirmation email for id=%s: %s", contact.pk, str(e))


@extend_schema(
    summary="List professional experience",
    description=(
        "Returns the professional experience entries displayed "
        "in the portfolio About section."
    ),
    responses={
        200: OpenApiResponse(
            response=ExperienceSerializer(many=True),
            description="Returns the list of professional experience entries.",
        ),
    },
    tags=["experience"],
)
class ExperienceListView(ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


@extend_schema(
    summary="List education",
    description=(
        "Returns the education entries displayed in the portfolio About section."
    ),
    responses={
        200: OpenApiResponse(
            response=EducationSerializer(many=True),
            description="Returns the list of education entries.",
        ),
    },
    tags=["education"],
)
class EducationListView(ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


@extend_schema(
    summary='List published testimonials',
    description=(
        'Returns testimonials approved for public display '
        'in the portfolio. Unpublished testimonials are excluded.'
    ),
    responses={
        200: OpenApiResponse(
            response=TestimonialSerializer(many=True),
            description='Returns published portfolio testimonials.',
        ),
    },
    tags=['testimonials'],
)
class TestimonialListView(ListAPIView):
    serializer_class = TestimonialSerializer

    def get_queryset(self):
        return Testimonial.objects.filter(is_published=True)