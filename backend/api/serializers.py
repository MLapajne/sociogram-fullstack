from django.contrib.auth.models import User
from .utils import send_welcome_email
from rest_framework import serializers
from .models import SubmitFrontendData
from .models import User, Sociogram




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstName', 'lastName', 'email', 'gender']

        
        

    

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
        
        
        users = []
        for user_data in users_data:
            user = User.objects.create(**user_data)
            users.append(user)
            send_welcome_email(user.email, user.id, sociogram.id)
    
        sociogram.users.set(users)
        #sociogram.save()
            
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
