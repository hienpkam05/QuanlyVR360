from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app_media", "0002_alter_sceneasset_managers_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="sceneasset",
            name="optimized_file",
            field=models.ImageField(blank=True, null=True, upload_to="scenes/optimized/"),
        ),
        migrations.AddField(
            model_name="sceneasset",
            name="preview_file",
            field=models.ImageField(blank=True, null=True, upload_to="scenes/previews/"),
        ),
        migrations.AddField(
            model_name="sceneasset",
            name="thumbnail_file",
            field=models.ImageField(blank=True, null=True, upload_to="scenes/thumbnails/"),
        ),
    ]
