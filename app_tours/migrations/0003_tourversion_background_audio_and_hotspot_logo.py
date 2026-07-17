from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app_tours", "0002_alter_tourversion_managers_tourversion_deleted_at_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="tourversion",
            name="background_audio",
            field=models.FileField(blank=True, null=True, upload_to="tours/audio/"),
        ),
        migrations.AddField(
            model_name="tourversion",
            name="hotspot_point_logo",
            field=models.ImageField(blank=True, null=True, upload_to="tours/hotspot_logos/"),
        ),
    ]
