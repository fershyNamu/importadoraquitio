from django.contrib import admin
from .models import Producto
from .models import Producto, VarianteProducto

# Register your models here.
class VarianteProductoInline(admin.TabularInline):
    model = VarianteProducto
    extra = 1

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_per_page = 20
    list_display = ('codigo','nombre','precio', 'categoria', 'disponible')
    list_filter = ('categoria', 'disponible')
    search_fields = ('codigo','nombre', 'categoria')
    inlines = [VarianteProductoInline]