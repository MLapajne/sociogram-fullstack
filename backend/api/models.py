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

    @staticmethod
    def generate_sqids():
        sqids = Sqids()
        random_values = [random.randint(0, 10) for _ in range(3)]
        return sqids.encode(random_values)

    random_value = models.CharField(max_length=100, default=generate_sqids, unique=True)
 
    #random_value = models.UUIDField(default=uuid.uuid4)