from django.contrib import admin
from .models import (
    ContactMessage,
    Education,
    Experience,
    Project,
    Service,
    Skill,
)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    list_display_links = ('title',)
    ordering = ('order',)
    search_fields = ('title', 'description')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'featured', 'date')
    list_display_links = ('title',)
    list_filter = ('featured', 'date')
    ordering = ('-date',)
    search_fields = ('title', 'description', 'long_description')
    readonly_fields = ('date',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    list_display_links = ('name',)
    ordering = ('-created_at',)
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'order')
    list_display_links = ('name',)
    list_filter = ('category',)
    ordering = ('order',)
    search_fields = ('name', 'category')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'company',
        'start_date',
        'current',
        'end_date',
        'order',
    )
    list_display_links = ('title',)
    list_filter = ('current',)
    search_fields = ('title', 'company', 'description')
    ordering = ('order', '-start_date')


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = (
        'degree',
        'institution',
        'start_year',
        'end_year',
        'order',
    )
    list_display_links = ('degree',)
    search_fields = ('degree', 'institution')
    ordering = ('order', '-end_year')