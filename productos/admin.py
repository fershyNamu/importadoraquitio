from django.contrib import admin
from .models import Producto

# Register your models here.
@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_per_page = 20
    list_display = ('codigo','nombre','precio', 'categoria', 'disponible')
    list_filter = ('categoria', 'disponible')
    search_fields = ('codigo','nombre', 'categoria')