from django.core.management.base import BaseCommand

from app_media.models import SceneAsset
from app_media.views import create_optimized_scene_images


class Command(BaseCommand):
    help = "Generate optimized WebP, preview and thumbnail files for existing scene assets."

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Regenerate files even when optimized images already exist.",
        )

    def handle(self, *args, **options):
        force = options["force"]
        queryset = SceneAsset.all_objects.exclude(original_file="")
        if not force:
            queryset = queryset.filter(optimized_file="")

        total = queryset.count()
        generated = 0
        failed = 0

        for asset in queryset.iterator():
            try:
                create_optimized_scene_images(asset)
                asset.save(
                    update_fields=[
                        "optimized_file",
                        "preview_file",
                        "thumbnail_file",
                        "updated_at",
                    ]
                )
                generated += 1
                self.stdout.write(self.style.SUCCESS(f"Optimized scene asset #{asset.pk}"))
            except Exception as exc:
                failed += 1
                self.stderr.write(self.style.ERROR(f"Failed scene asset #{asset.pk}: {exc}"))

        self.stdout.write(
            self.style.SUCCESS(
                f"Done. Checked {total}, generated {generated}, failed {failed}."
            )
        )
