from django.test import TestCase
from django.urls import reverse

from .models import Producto


class ProductoModelTest(TestCase):

    def test_str_devuelve_el_nombre(self):
        producto = Producto.objects.create(
            nombre="Sartén antiadherente",
            precio="15.50",
            categoria=Producto.CATEGORIA_COCINA,
        )
        self.assertEqual(str(producto), "Sartén antiadherente")

    def test_disponible_por_defecto_true(self):
        producto = Producto.objects.create(nombre="Vaso", precio="2.00")
        self.assertTrue(producto.disponible)


class ListaProductosViewTest(TestCase):

    def test_muestra_solo_productos_disponibles(self):
        Producto.objects.create(
            nombre="Producto disponible", precio="10.00", disponible=True
        )
        Producto.objects.create(
            nombre="Producto agotado", precio="10.00", disponible=False
        )

        response = self.client.get(reverse('productos'))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Producto disponible")
        self.assertNotContains(response, "Producto agotado")

    def test_pagina_carga_sin_productos(self):
        response = self.client.get(reverse('productos'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Todavía no hay productos publicados")
