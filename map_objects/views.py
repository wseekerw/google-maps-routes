from django.shortcuts import render
from django.conf import settings
# Create your views here.


def home(request):
    return render(request, 'main.html', {'STATIC_URL': settings.STATIC_URL})
