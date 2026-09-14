from django.db import models


class Producto(models.Model):

    # Mismas claves que usan los botones de filtro y data-category
    # en productos.html, para que el filtrado en JS siga funcionando
    # con productos que vienen de la base de datos.
    CATEGORIA_COCINA = 'cocina'
    CATEGORIA_VAJILLA = 'vajilla'
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
        (CATEGORIA_COCINA, 'Cocina'),
        (CATEGORIA_VAJILLA, 'Vajilla y Platos'),
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
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='productos/', blank=True, null=True)
    categoria = models.CharField(
        max_length=100, blank=True, choices=CATEGORIA_CHOICES
    )
    disponible = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre