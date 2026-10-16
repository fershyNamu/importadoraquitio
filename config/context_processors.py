from django.conf import settings
from productos.models import Producto
from django.contrib.auth.models import User, Group


def whatsapp_number(request):
    return {'whatsapp_number': settings.WHATSAPP_NUMBER}


def dashboard_stats(request):
    # Solo calcula estas consultas dentro del panel admin,
    # para no gastarlas en cada visita al sitio público.
    if not request.path.startswith('/panel-quitio/'):
        return {}
    return {
        'total_productos': Producto.objects.count(),
        'total_usuarios': User.objects.count(),
        'total_grupos': Group.objects.count(),
    }

# tu_app/context_processors.py
from django.conf import settings

def tema(request):
    return {'TEMA_NAVIDAD': getattr(settings, 'TEMA_NAVIDAD', True)}