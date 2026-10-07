from django.contrib import admin

from .models import ContactMessage, Project, Service


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
