from django.urls import path
import django.contrib.auth.urls
from . import views
from . import models
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
        path('',views.loginuser, name = 'loginuser'),
        path('loginmethod',models.loginmethod,name = 'loginmethod'),
        path('logoutmethod',models.logoutmethod,name = 'logoutmethod'),
        path('home',models.home, name = 'home'),
        path('upload',models.upload, name = 'upload'),
        path('train',models.training, name = 'training'),
        path('enable',models.enablehostmodel, name ="enablehostmodel"),
        path('pickle_model',models.picklemodel, name = 'pickle_model'),
        path('host_model',csrf_exempt(models.hostmodel), name = 'host_model'),
        path('get_model',csrf_exempt(models.getmodel), name = 'get_model'),
        ]