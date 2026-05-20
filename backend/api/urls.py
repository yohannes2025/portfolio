# backend/api/urls.py
from django.urls import path
from .views import ServiceListView, ProjectListView, ContactView

urlpatterns = [
    path('services/', ServiceListView.as_view()),
    path('projects/', ProjectListView.as_view()),
    path('contact/', ContactView.as_view()),
]
