from io import BytesIO

from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
from rest_framework import status
from rest_framework.test import APITestCase

from .models import ContactMessage, Project, Service


class PortfolioAPITests(APITestCase):
    def setUp(self):
        self.services_url = '/api/services/'
        self.projects_url = '/api/projects/'
        self.contact_url = '/api/contact/'

    def test_services_endpoint_returns_empty_list(self):
        response = self.client.get(self.services_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_services_endpoint_returns_serialized_services(self):
        Service.objects.create(
            title='Django API Development',
            description='Professional REST API development with Django.',
            icon='fas fa-code',
            order=1,
        )

        response = self.client.get(self.services_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Django API Development')
        self.assertEqual(
            response.data[0]['description'],
            'Professional REST API development with Django.',
        )
        self.assertEqual(response.data[0]['icon'], 'fas fa-code')
        self.assertEqual(response.data[0]['order'], 1)

    def test_services_endpoint_rejects_post(self):
        payload = {
            'title': 'Unauthorized Service',
            'description': 'This should not be created through the public API.',
            'icon': 'fas fa-ban',
            'order': 99,
        }

        response = self.client.post(
            self.services_url,
            payload,
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertEqual(Service.objects.count(), 0)

    def test_projects_endpoint_returns_empty_list(self):
        response = self.client.get(self.projects_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_projects_endpoint_returns_serialized_projects(self):
        image_data = BytesIO()
        Image.new('RGB', (1, 1), color='white').save(
            image_data,
            format='JPEG',
        )
        image_data.seek(0)

        Project.objects.create(
            title='Portfolio API',
            description='A professional portfolio REST API.',
            long_description='Detailed portfolio API project.',
            image=SimpleUploadedFile(
                'portfolio.jpg',
                image_data.read(),
                content_type='image/jpeg',
            ),
            technologies=['Django', 'Django REST Framework', 'PostgreSQL'],
            github_url='https://github.com/example/portfolio',
            live_url='https://example.com',
            featured=True,
        )

        response = self.client.get(self.projects_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Portfolio API')
        self.assertEqual(
            response.data[0]['description'],
            'A professional portfolio REST API.',
        )
        self.assertEqual(
            response.data[0]['technologies'],
            ['Django', 'Django REST Framework', 'PostgreSQL'],
        )
        self.assertEqual(
            response.data[0]['github_url'],
            'https://github.com/example/portfolio',
        )
        self.assertEqual(
            response.data[0]['live_url'],
            'https://example.com',
        )
        self.assertTrue(response.data[0]['featured'])

    def test_projects_endpoint_rejects_post(self):
        response = self.client.post(
            self.projects_url,
            {
                'title': 'Unauthorized Project',
            },
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertEqual(Project.objects.count(), 0)

    def test_contact_endpoint_accepts_valid_data(self):
        payload = {
            'name': 'Test Visitor',
            'email': 'visitor@example.com',
            'message': 'This is a test contact message.',
        }

        response = self.client.post(
            self.contact_url,
            payload,
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_contact_endpoint_rejects_get(self):
        response = self.client.get(self.contact_url)

        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_contact_endpoint_rejects_invalid_email(self):
        payload = {
            'name': 'Test Visitor',
            'email': 'not-an-email',
            'message': 'This should fail validation.',
        }

        response = self.client.post(
            self.contact_url,
            payload,
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_contact_endpoint_rejects_missing_required_fields(self):
        payload = {
            'name': 'Test Visitor',
        }

        response = self.client.post(
            self.contact_url,
            payload,
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
        self.assertIn('message', response.data)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_contact_endpoint_rejects_empty_message(self):
        payload = {
            'name': 'Test Visitor',
            'email': 'visitor@example.com',
            'message': '',
        }

        response = self.client.post(
            self.contact_url,
            payload,
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
        self.assertEqual(ContactMessage.objects.count(), 0)
