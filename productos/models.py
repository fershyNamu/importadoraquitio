from django.core.exceptions import ValidationError
from django.db import models

# 5 MB máximo por imagen subida desde el admin
MAX_IMAGEN_BYTES = 5 * 1024 * 1024


def validar_tamano_imagen(imagen):
    if imagen and imagen.size > MAX_IMAGEN_BYTES:
        raise ValidationError('La imagen no puede superar los 5 MB.')


class Producto(models.Model):

    # Mismas claves que usan los botones de filtro y data-category
    # en productos.html, para que el filtrado en JS siga funcionando
    # con productos que vienen de la base de datos.
    CATEGORIA_COCINA = 'cocina'
    CATEGORIA_NAVIDAD = 'navidad'
    CATEGORIA_VAJILLA = 'vajilla'
    CATEGORIA_JARROS = 'jarros'
    CATEGORIA_DECORACION = 'decoracion'
    CATEGORIA_ORGANIZACION = 'organizacion'
    CATEGORIA_LIMPIEZA = 'limpieza'
    CATEGORIA_DEPORTES = 'deportes'
    CATEGORIA_SALUD = 'salud'
    CATEGORIA_NINOS = 'ninos'
    CATEGORIA_VIAJE = 'viaje'
    CATEGORIA_MASCOTAS = 'mascotas'
    CATEGORIA_FERRETERIA = 'ferreteria'
    CATEGORIA_ELECTRO = 'electro'

    CATEGORIA_CHOICES = [
        (CATEGORIA_NAVIDAD, 'Navidad'),
        (CATEGORIA_COCINA, 'Cocina'),
        (CATEGORIA_VAJILLA, 'Vajilla y Platos'),
        (CATEGORIA_JARROS, 'Jarros'),
        (CATEGORIA_DECORACION, 'Decoración'),
        (CATEGORIA_ORGANIZACION, 'Organización'),
        (CATEGORIA_LIMPIEZA, 'Limpieza'),
        (CATEGORIA_DEPORTES, 'Deportes y Fitness'),
        (CATEGORIA_SALUD, 'Salud y Cuidado Personal'),
        (CATEGORIA_NINOS, 'Niños y Bebés'),
        (CATEGORIA_VIAJE, 'Viaje y Accesorios'),
        (CATEGORIA_MASCOTAS, 'Mascotas'),
        (CATEGORIA_FERRETERIA, 'Ferretería'),
        (CATEGORIA_ELECTRO, 'Electrodomésticos y Electrónica'),
    ]

    nombre = models.CharField(max_length=200)
    codigo = models.CharField(max_length=50, unique=True, blank=True, null=True)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(
        upload_to='productos/', blank=True, null=True,
        validators=[validar_tamano_imagen],
    )
    categoria = models.CharField(
        max_length=100, blank=True, choices=CATEGORIA_CHOICES
    )
    disponible = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

    def tiene_variantes(self):
        return self.variantes.exists()

    def precio_desde(self):
        if self.tiene_variantes():
            return self.variantes.order_by('precio').first().precio
        return self.precio

class VarianteProducto(models.Model):
    producto = models.ForeignKey(Producto, related_name='variantes', on_delete=models.CASCADE)
    medida = models.CharField(max_length=100, help_text="Ej: 120cm, 240cm, Talla M")
    codigo = models.CharField(max_length=50, unique=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    disponible = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.producto.nombre} - {self.medida}"