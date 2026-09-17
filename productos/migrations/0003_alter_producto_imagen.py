from django.db import migrations, models
import productos.models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0002_alter_producto_categoria'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='imagen',
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to='productos/',
                validators=[productos.models.validar_tamano_imagen],
            ),
        ),
    ]
