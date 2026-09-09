from django.shortcuts import render

# Create your views here.
from django.shortcuts import render


def home(request):
    return render(request, 'home.html')


def categorias(request):
    return render(request, 'categorias.html')


def productos(request):
    return render(request, 'productos.html')


def sucursales(request):
    return render(request, 'sucursales.html')