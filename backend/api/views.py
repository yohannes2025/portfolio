# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from .models import Service, Project
from .serializers import ContactSerializer


class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            message = serializer.save()

            # Send email notification
            send_mail(
                subject=f"New Contact from {message.name}",
                message=message.message,
                from_email=message.email,
                recipient_list=['your@email.com'],
                fail_silently=True,
            )
            return Response({"status": "success"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
