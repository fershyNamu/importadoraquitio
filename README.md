# Importadora Quitio

Sitio Django con catálogo de productos (público) y panel de administración.

## Requisitos

- Python 3.11+
- pip

## Configuración local

1. Crea y activa un entorno virtual, luego instala dependencias:

   ```bash
   python -m venv venv
   source venv/bin/activate   # en Windows: venv\Scripts\activate
   pip install -r requeriments.txt
   ```

2. Define las variables de entorno para desarrollo local (por ejemplo, expórtalas
   en tu terminal o en un archivo `.env` si usas algo como `python-dotenv`):

   ```bash
   export DEBUG=True
   export SECRET_KEY=una-clave-cualquiera-para-desarrollo
   ```

   Si no defines `DEBUG`, por defecto queda en `False` (modo seguro).

3. Aplica migraciones y levanta el servidor:

   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

## Variables de entorno en producción

| Variable        | Descripción                                                        |
|-----------------|---------------------------------------------------------------------|
| `SECRET_KEY`    | Clave secreta única (genera una nueva, no uses la del código fuente)|
| `DEBUG`         | Debe ser `False` en producción                                      |
| `ALLOWED_HOSTS`  | Dominios permitidos, separados por coma (ej: `midominio.com,www.midominio.com`) |

## Desplegar con gunicorn

Este proyecto incluye un `Procfile`:

```
web: gunicorn config.wsgi --log-file -
```

Antes de desplegar, corre:

```bash
python manage.py collectstatic --noinput
```

Whitenoise (ya configurado en `MIDDLEWARE` y `STORAGES`) se encarga de servir
los archivos estáticos generados en `staticfiles/`.

## Pendiente / a futuro

- **Paginación del catálogo**: hoy `productos.html` carga todos los productos
  disponibles y el buscador/filtros funcionan en el navegador (JavaScript)
  sobre esa lista completa. Si el catálogo crece mucho, se puede paginar en
  el servidor, pero eso implica rehacer el buscador para que consulte al
  servidor (por AJAX) en vez de filtrar el HTML ya cargado — de lo contrario
  la búsqueda solo encontraría productos de la página actual.
- Páginas de contenido reales para "Envíos" y "Preguntas frecuentes" (por
  ahora esos enlaces del footer llevan a WhatsApp o a la sección de envíos
  del home).
