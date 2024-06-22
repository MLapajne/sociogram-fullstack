import uuid
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, UserRandomValue
from django import forms

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        UserRandomValue.objects.create(user=user) # uuid
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content","created_at", "author", ]
        read_only_fields = ["author", "created_at"]
        #extra_kwargs = {"title": {"author": {"write_only": True}}}


class UserFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'