from django.urls import path

from .views import (
    ContactCreateView,
    EducationListView,
    ExperienceListView,
    ProjectListView,
    ServiceListView,
    SkillListView,
    TestimonialListView,
)

urlpatterns = [
    path('services/', ServiceListView.as_view(), name='services'),
    path('projects/', ProjectListView.as_view(), name='projects'),
    path('skills/', SkillListView.as_view(), name='skills'),
    path('contact/', ContactCreateView.as_view(), name='contact'),
    path(
        'experiences/',
        ExperienceListView.as_view(),
        name='experiences',
    ),
    path(
        'education/',
        EducationListView.as_view(),
        name='education',
    ),
    path(
        'testimonials/',
        TestimonialListView.as_view(),
        name='testimonials',
    ),
]