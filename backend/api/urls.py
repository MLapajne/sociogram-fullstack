from django.urls import path, include
from . import views
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from .views import SociogramViewSet
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

router = DefaultRouter()
router.register(r'sociograms', SociogramViewSet)

urlpatterns = [
    path('', include(router.urls)), 
    path('notes/', views.NoteListCreate.as_view()   , name='note-list-create'),
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='note-delete'),
    #path('users/', views.CreateUserView.as_view(), name='create-user'),
    #path('<int:random_url>/', views.UserFormView.as_view(), name='user-form'),
    #path('user_form/', views.UserFormView.as_view(), name='user-form'),
    #path('success/', TemplateView.as_view(template_name="success.html"), name='success'),
    #path('display_url/', views.DisplayUrl.as_view(), name='display-url'),  # Use UserFormView for display_url

    # API Schema:
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]