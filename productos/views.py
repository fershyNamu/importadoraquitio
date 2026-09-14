from django.shortcuts import render

from .models import Producto


def lista_productos(request):
    """Catálogo de productos: antes productos.html era HTML estático
    con productos de ejemplo escritos a mano; ahora se listan los
    productos reales cargados desde el admin."""
    productos = Producto.objects.filter(disponible=True).order_by('nombre')
    return render(request, 'productos.html', {'productos': productos})

