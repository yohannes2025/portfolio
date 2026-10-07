from rest_framework.generics import CreateAPIView, ListAPIView

from .models import ContactMessage, Project, Service
from .serializers import ContactSerializer, ProjectSerializer, ServiceSerializer


class ServiceListView(ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ProjectListView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ContactCreateView(CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactSerializer
