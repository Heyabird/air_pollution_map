from django.urls import path

from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('', views.receive_data, name='retrieveData'),
    path('<int:question_id>/', views.detail, name='detail'),
]