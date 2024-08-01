import uuid
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, SubmitFrontendData, UserRandomValue
from django import forms
from rest_framework.response import Response
from .models import User, Sociogram

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

"""
class UserFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
"""



#generated code:





class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstName', 'lastName', 'gender']
        
import logging

logger = logging.getLogger(__name__)
    

class SociogramSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)



    class Meta:
        model = Sociogram
        fields = ['id','instructorName', 'description', 'language', 'negQuestions', 'posQuestions' ,'users']
        #read_only_fields = ['sociogram_unique_id']
    """
    def list(self, request):
        sociograms = Sociogram.objects.all()
        return sociograms
    """

    def create(self, validated_data):
        users_data = validated_data.pop('users')
        
        sociogram = Sociogram.objects.create(**validated_data)
        
        
        for user_data in users_data:
            user, created = User.objects.get_or_create(**user_data)
            sociogram.users.add(user)
        
            
        return sociogram




class SubmitFrontendDataSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)
    #sociogramId = serializers.CharField(max_length=50)

    class Meta:
        model = SubmitFrontendData
        fields = ['sociogramId', 'firstName' ,'lastName', 'createdAt', 'gender', 'users', 'posQuestions', 'negQuestions']
    
    def create(self, validated_data):
        sociogram_id = validated_data.get('sociogramId')
        try:
            sociogram = Sociogram.objects.get(id=sociogram_id)
        except Sociogram.DoesNotExist:
            raise serializers.ValidationError("Sociogram does not exist")

        submitFrontendData = SubmitFrontendData.objects.create(**validated_data)
        submitFrontendData.users.set(sociogram.users.all())

        return submitFrontendData
