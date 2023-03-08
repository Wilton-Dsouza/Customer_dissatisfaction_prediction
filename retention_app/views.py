from django.shortcuts import render
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.forms import UserCreationForm
import pandas as pd
# Create your views here.
from django.http import HttpResponse
from wsgiref.util import FileWrapper
from django.template.response import TemplateResponse
import json 

def loginuser(request):
    return render(request,'login.html')
