from productos.models import Producto
from django.contrib.auth.models import User, Group


def dashboard_stats(request):
    return {
        'total_productos': Producto.objects.count(),
        'total_usuarios': User.objects.count(),
        'total_grupos': Group.objects.count(),
    }