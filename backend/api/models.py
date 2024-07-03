import random
import uuid
from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from sqids import Sqids

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
    def generate_sqids():
        sqids = Sqids()
        random_values = [random.randint(0, 10) for _ in range(3)]
        return sqids.encode(random_values)

    random_value = models.CharField(max_length=100, default=generate_sqids, unique=True)
 
    #random_value = models.UUIDField(default=uuid.uuid4)


#gen code:


class Question(models.Model):
    QUESTION_TYPES = (
        ('pos', 'Positive'),
        ('neg', 'Negative')
    )
    question_text = models.TextField()
    question_type = models.CharField(max_length=3, choices=QUESTION_TYPES)

    def __str__(self):
        return self.question_text

class User(models.Model):
    GENDER_CHOICES = (
        ('m', 'Male'),
        ('f', 'Female'),
        ('o', 'Other')
    )
    uid = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class SociogramData(models.Model):
    instructor_name = models.CharField(max_length=100)
    description = models.TextField()
    language = models.CharField(max_length=2)

    def __str__(self):
        return f"{self.instructor_name} answered {self.description} in {self.language}"

class Sociogram(models.Model):
    
    sociogram_data = models.ManyToManyField(SociogramData, related_name='sociogram_data')
    pos_questions = models.ManyToManyField(Question, related_name='positive_sociograms')
    neg_questions = models.ManyToManyField(Question, related_name='negative_sociograms')
    users = models.ManyToManyField(User, related_name='sociograms')



