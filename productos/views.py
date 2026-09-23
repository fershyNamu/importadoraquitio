from django.shortcuts import get_object_or_404, render

from .models import Producto


def lista_productos(request):
    """Catálogo de productos: antes productos.html era HTML estático
    con productos de ejemplo escritos a mano; ahora se listan los
    productos reales cargados desde el admin."""
    productos = Producto.objects.filter(disponible=True).order_by('nombre')
    return render(request, 'productos.html', {'productos': productos})


def detalle_producto(request, pk):
    """Ficha individual de un producto. En vez de un carrito de
    compras, el botón principal abre WhatsApp con un mensaje
    prellenado preguntando por ese producto puntual."""
    producto = get_object_or_404(Producto, pk=pk)

    similares = (
        Producto.objects.filter(categoria=producto.categoria, disponible=True)
        .exclude(pk=producto.pk)
        .order_by('nombre')[:4]
    )

    return render(
        request,
        'producto_detalle.html',
        {'producto': producto, 'similares': similares},
    )

