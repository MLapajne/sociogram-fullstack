from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import SociogramViewSet
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

router = DefaultRouter()
router.register(r'sociograms', SociogramViewSet)
router.register(r'questionsFrontend', views.QuestionFrontendViewSet)

urlpatterns = [
    path('', include(router.urls)), 
    # API Schema:
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]