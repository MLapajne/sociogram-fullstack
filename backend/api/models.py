import random
import uuid
from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class UserRandomValue(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #@staticmethod
    """
    def generate_sqids():
    sqids = Sqids()
    random_values = [random.randint(0, 10) for _ in range(3)]
    return sqids.encode(random_values)

    random_value = models.CharField(max_length=100, default=generate_sqids, unique=True)
    """
   


        
#gen code:




class User(models.Model):
    GENDER_CHOICES = (
        ('MALE', 'Male'),
        ('FEMALE', 'Female'),
        ('OTHER', 'Other')
    )
    id = models.CharField(max_length=50, primary_key=True)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    


class Sociogram(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    instructorName = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    language = models.CharField(max_length=2)
    #sociogram_unique_id = models.UUIDField(default=uuid.uuid4, editable=False ,unique=True)
    negQuestions = models.JSONField()
    posQuestions = models.JSONField()
    users = models.ManyToManyField(User, related_name='sociograms')






class SubmitFrontendData(models.Model):
    GENDER_CHOICES = (
        ('MALE', 'Male'),
        ('FEMALE', 'Female'),
        ('OTHER', 'Other')
    )
    sociogramId = models.CharField(max_length=100)
    #author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='answers_frontend')
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    users = models.ManyToManyField(User, related_name='answers_frontend')
    createdAt = models.DateTimeField(auto_now_add=True)
    posQuestions = models.JSONField(default=list)
    negQuestions = models.JSONField(default=list)
    
    
    