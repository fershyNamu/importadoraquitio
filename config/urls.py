"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from productos import views as productos_views

urlpatterns = [
    path('admin/', admin.site.urls),

    # Páginas del sitio. Se mantienen las mismas rutas que ya usaba
    # la navegación estática (home.html, categorias.html, etc.) para
    # no romper los enlaces existentes entre páginas.
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('home.html', TemplateView.as_view(template_name='home.html'), name='home_html'),
    path('categorias.html', TemplateView.as_view(template_name='categorias.html'), name='categorias'),
    path('productos.html', productos_views.lista_productos, name='productos'),
    path('sucursales.html', TemplateView.as_view(template_name='sucursales.html'), name='sucursales'),
]

# Sirve los archivos subidos (Producto.imagen) durante desarrollo.
# Sin esto, DEBUG=True no era suficiente porque MEDIA_URL/MEDIA_ROOT
# no estaban definidos y no había ninguna ruta que los expusiera.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
