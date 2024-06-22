from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='note-list-create'),
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='note-delete'),
    #path('users/', views.CreateUserView.as_view(), name='create-user'),
    #path('<int:random_url>/', views.UserFormView.as_view(), name='user-form'),
    #path('user_form/', views.UserFormView.as_view(), name='user-form'),
    path('success/', TemplateView.as_view(template_name="success.html"), name='success'),
    path('display_url/', views.DisplayUrl.as_view(), name='display-url'),  # Use UserFormView for display_url
]