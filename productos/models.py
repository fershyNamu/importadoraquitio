from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='productos/', blank=True, null=True)
    categoria = models.CharField(max_length=100, blank=True)
    disponible = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre