from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiResponse,
    extend_schema,
)
from rest_framework.generics import CreateAPIView, ListAPIView

from .models import ContactMessage, Project, Service
from .serializers import ContactSerializer, ProjectSerializer, ServiceSerializer


@extend_schema(
    summary='List services',
    description='Returns the professional services offered by Yohannes Tekle.',
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
    description='Returns the portfolio projects developed by Yohannes Tekle.',
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
    summary='Send contact message',
    description='Allows visitors to submit a contact message through the portfolio.',
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
                        'message': 'This is a test contact message.',
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
	                'email': ['Enter a valid email address.'],
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
