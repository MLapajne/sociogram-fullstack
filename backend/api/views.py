import random
from urllib import response
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import generics
from .serializers import UserFormSerializer, UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserRandomValue
import uuid
from .models import Question, User, Sociogram
from .serializers import QuestionSerializer, UserSerializer, SociogramSerializer
from rest_framework import viewsets
from rest_framework import mixins, viewsets

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
# Create your views here.

class DisplayUrl(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserFormSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        user_id = request.GET.get('id')

        if user_id:
            # If an ID is provided, return the URL for that user
            try:
                user_random_value = UserRandomValue.objects.get(user=user_id)
            except UserRandomValue.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)

            url = [user_random_value.random_value]
            return JsonResponse(urls, safe=False)
        else:
            # If no ID is provided, return the URLs for all users
            try:
                user_random_values = UserRandomValue.objects.all()
            except UserRandomValue.DoesNotExist:
                return JsonResponse({'error': 'No users found'}, status=404)

            urls = []
            for user_random_value in user_random_values:
                url = user_random_value.random_value
                urls.append(url)

            return JsonResponse(urls, safe=False)

    def post(self, request ):
        serializer = UserFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return redirect(reverse('success'))
        return render(request, 'user_form.html', {'form': serializer})
    

class UserFormView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserFormSerializer
    permission_classes = [AllowAny]

    def get(self, request, random_value ):
        #return render(request, 'user_form.html', {'form': UserFormSerializer()})
        return render(request, 'user_form.html', {'random_value': random_value})

    def post(self, request):
        #serializer = UserFormSerializer(data=request.data)
        #if serializer.is_valid():
        #    serializer.save()
        #    return redirect(reverse('success'))
        #return render(request, 'user_form.html', {'form': serializer})
        username = request.POST.get('username')
        # Save data or perform some action
        return JsonResponse({'message': 'Form submitted successfully'})
    
class SubmitUserForm(APIView):
    def post(self, request):
        # Process the submitted data
        data = request.data
        # Assuming 'username' is a field in the form
        username = data.get('username')
        # Save or process the data as needed
        return Response({'message': 'Form submitted successfully'}, status=status.HTTP_200_OK)

"""
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
"""
class SociogramViewSet(mixins.CreateModelMixin, 
                        mixins.ListModelMixin, 
                        viewsets.GenericViewSet):
    queryset = Sociogram.objects.all()
    serializer_class = SociogramSerializer