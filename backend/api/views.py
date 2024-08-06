
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import SubmitFrontendDataSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from .models import SubmitFrontendData
from rest_framework import status
from rest_framework.response import Response
from .models import User, Sociogram
from .serializers import UserSerializer, SociogramSerializer
from rest_framework import viewsets
from rest_framework import mixins, viewsets
from rest_framework.decorators import action



class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
# Create your views here.

class SociogramViewSet(mixins.CreateModelMixin, 
                        mixins.ListModelMixin, 
                        viewsets.GenericViewSet):
    queryset = Sociogram.objects.all()
    serializer_class = SociogramSerializer

    def create(self, request, *args, **kwargs):
        Sociogram.objects.all().delete()
        User.objects.all().delete()
        serializer = self.get_serializer(data=request.data)
        #serializer.is_valid(raise_exception=True)
        if not serializer.is_valid():
            print("Validation errors:", serializer.errors)  # Print validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        print("Instance created:", serializer.instance) 
        # Customize the response data as needed
        custom_response_data = {
            'success': True,
        }
        return Response(custom_response_data, status=status.HTTP_201_CREATED)
    


class QuestionFrontendViewSet(mixins.CreateModelMixin, 
                        mixins.ListModelMixin, 
                        mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    queryset = SubmitFrontendData.objects.all()
    serializer_class = SubmitFrontendDataSerializer

    
    @action(detail=False, methods=['get'], url_path='get-by-sociogram-id/(?P<sociogramId>[^/.]+)')
    def get_by_sociogram_id(self, request, sociogramId=None):
        queryset = self.get_queryset().filter(sociogramId=sociogramId)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

    
    @action(detail=False, methods=['delete'], url_path='delete-by-sociogram-id/(?P<sociogramId>[^/.]+)')
    def delete_by_sociogram_id(self, request, sociogramId=None):
        queryset = self.get_queryset().filter(sociogramId=sociogramId)
        deleted_count, _ = queryset.delete()
        sociogram_queryset = SociogramViewSet().get_queryset().filter(id=sociogramId)
        sociogram_deleted_count, _ = sociogram_queryset.delete()
        deleted_count, _ = User.objects.all().delete()


        total_deleted_count = deleted_count + sociogram_deleted_count
        return Response(
            {'message': f'{total_deleted_count} objects deleted.'},
            status=status.HTTP_200_OK
        )