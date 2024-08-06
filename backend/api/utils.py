from django.core.mail import send_mail
from django.conf import settings

def send_welcome_email(to_email, userId, SociogramId):
    subject = 'Url for solving Sociogram forms'
    url = f"http://example.com/{userId}-{SociogramId}"
    message = f'The form is available at the following URL: {url}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [to_email]
    
    send_mail(subject, message, email_from, recipient_list, fail_silently=False)