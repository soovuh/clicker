# Generated by Django 4.2.6 on 2023-10-23 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='image',
            field=models.ImageField(blank=True, upload_to='avatars'),
        ),
    ]