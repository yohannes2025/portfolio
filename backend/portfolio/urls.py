# backend/portfolio/urls.py
from django.contrib import admin
from django.urls import path, include  # 1. Import include here

urlpatterns = [
    path('admin/', admin.site.urls),
    # 2. Route all 'api/' prefixes to your api/urls.py
    path('api/', include('api.urls')),
]
