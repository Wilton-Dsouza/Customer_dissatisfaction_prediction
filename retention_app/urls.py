from django.urls import path
from . import views
from . import models

urlpatterns = [
        path('',models.home, name = 'home'),
        path('home',models.home, name = 'home'),
        path('upload',models.upload, name = 'upload'),
        path('train',models.training, name = 'training'),
        path('pickle_model',models.picklemodel, name = 'pickle_model'),
        ]