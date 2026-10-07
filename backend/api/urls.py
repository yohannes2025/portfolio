from django.urls import path

from .views import ContactCreateView, ProjectListView, ServiceListView

urlpatterns = [
    path('services/', ServiceListView.as_view(), name='services'),
    path('projects/', ProjectListView.as_view(), name='projects'),
    path('contact/', ContactCreateView.as_view(), name='contact'),
]
