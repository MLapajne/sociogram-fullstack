import random
from urllib import response
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import generics
from .serializers import SubmitFrontendDataSerializer, UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, SubmitFrontendData
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserRandomValue
import uuid
from .models import User, Sociogram
from .serializers import UserSerializer, SociogramSerializer, QuestionFrontendSerializer
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
"""
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
 """   


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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        #serializer.is_valid(raise_exception=True)
        if not serializer.is_valid():
            print("Validation errors:", serializer.errors)  # Print validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        print("Instance created:", serializer.instance) 
        # Customize the response data as needed
        custom_response_data = {
            'success': True,
        }
        return Response(custom_response_data, status=status.HTTP_201_CREATED)
    
    def perform_create(self, serializer):
        # Add any custom creation logic here
        serializer.save()

class QuestionFrontendViewSet(mixins.CreateModelMixin, 
                        mixins.ListModelMixin, 
                        viewsets.GenericViewSet):
    queryset = SubmitFrontendData.objects.all()
    serializer_class = SubmitFrontendDataSerializer