from django.contrib import admin

# Register your models here.
from .models import Question, User, Sociogram

# Register your models here.
admin.site.register(Question)
admin.site.register(User)
admin.site.register(Sociogram)