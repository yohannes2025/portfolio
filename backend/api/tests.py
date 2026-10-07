from rest_framework import status
from rest_framework.test import APITestCase

from .models import ContactMessage


class PortfolioAPITests(APITestCase):
    def setUp(self):
        self.services_url = '/api/services/'
        self.projects_url = '/api/projects/'
        self.contact_url = '/api/contact/'

    def test_services_endpoint_returns_empty_list(self):
        response = self.client.get(self.services_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_projects_endpoint_returns_empty_list(self):
        response = self.client.get(self.projects_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

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
