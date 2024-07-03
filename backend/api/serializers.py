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


#generated code:

from .models import Question, User, Sociogram, SociogramData

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'question_type']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'uid', 'first_name', 'last_name', 'gender']

class SociogramDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SociogramData
        fields = ['id', 'instructor_name', 'description', 'language']

class SociogramSerializer(serializers.ModelSerializer):
    pos_questions = QuestionSerializer(many=True)
    neg_questions = QuestionSerializer(many=True)
    users = UserSerializer(many=True)
    sociogramData = SociogramDataSerializer(many=True)

    class Meta:
        model = Sociogram
        fields = ['id', 'pos_questions', 'neg_questions', 'users', 'sociogramData']

    def create(self, validated_data):
        pos_questions_data = validated_data.pop('pos_questions')
        neg_questions_data = validated_data.pop('neg_questions')
        users_data = validated_data.pop('users')
        sociogramsData_data = validated_data.pop('sociogramData')
        
        sociogram = Sociogram.objects.create(**validated_data)
        
        for question_data in pos_questions_data:
            question, created = Question.objects.get_or_create(**question_data)
            sociogram.pos_questions.add(question)
        
        for question_data in neg_questions_data:
            question, created = Question.objects.get_or_create(**question_data)
            sociogram.neg_questions.add(question)
        
        for user_data in users_data:
            user, created = User.objects.get_or_create(**user_data)
            sociogram.users.add(user)

        for sociogramData_data in sociogramsData_data:
            sociogramData_new, created = SociogramData.objects.get_or_create(**sociogramData_data)
            sociogram.sociogram_data.add(sociogramData_new)
            
        return sociogram
