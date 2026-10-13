"""
URL configuration for portfolio project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls.static import static
from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import logging
import os
import secrets

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.db import connection
from django.db.migrations.recorder import MigrationRecorder
from django.http import HttpResponseNotFound, JsonResponse
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

def healthz(request):
    """Provide a lightweight health check for Render."""
    return JsonResponse({'status': 'ok'})


def temporary_database_diagnostic(request):
    """Temporarily inspect production database schema without exposing data."""
    expected_token = os.environ.get('PORTFOLIO_DIAGNOSTIC_TOKEN')
    supplied_token = request.headers.get('Authorization', '')

    if (
        not expected_token
        or not secrets.compare_digest(
            supplied_token,
            f'Bearer {expected_token}',
        )
    ):
        return HttpResponseNotFound()

    try:
        with connection.cursor():
            pass

        tables = connection.introspection.table_names()
        migration_applied = MigrationRecorder(connection).migration_qs.filter(
            app='api',
            name='0005_testimonial',
        ).exists()

        return JsonResponse({
            'database_vendor': connection.vendor,
            'testimonial_table_exists': 'api_testimonial' in tables,
            'migration_0005_recorded': migration_applied,
        })
        except Exception as exc:
        logging.getLogger(__name__).exception(
            'Temporary database diagnostic failed'
        )

        return JsonResponse({
            'database_vendor': connection.vendor,
            'diagnostic_error_type': type(exc).__name__,
        }, status=500)


urlpatterns = [
    path('healthz', healthz, name='healthz'),
    path(
        'api/__temporary-database-diagnostic/',
        temporary_database_diagnostic,
        name='temporary-database-diagnostic',
    ),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path(
        'api/docs/',
        SpectacularSwaggerView.as_view(url_name='schema'),
        name='swagger-ui',
    ),
    path(
        'api/redoc/',
        SpectacularRedocView.as_view(url_name='schema'),
        name='redoc',
    ),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )
