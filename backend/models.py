from django.db import models, transaction
from django.utils import timezone


class SoftDeleteQuerySet(models.QuerySet):
    def delete(self):
        deleted = 0
        details = {}
        with transaction.atomic():
            for instance in self.iterator():
                count, model_details = instance.delete()
                deleted += count
                for label, amount in model_details.items():
                    details[label] = details.get(label, 0) + amount
        return deleted, details

    def active(self):
        return self.filter(is_deleted=False)

    def deleted(self):
        return self.filter(is_deleted=True)


class SoftDeleteManager(models.Manager.from_queryset(SoftDeleteQuerySet)):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class AllObjectsManager(models.Manager.from_queryset(SoftDeleteQuerySet)):
    pass


class SoftDeleteModel(models.Model):
    is_deleted = models.BooleanField(default=False, db_index=True, editable=False)
    deleted_at = models.DateTimeField(null=True, blank=True, editable=False)

    objects = SoftDeleteManager()
    all_objects = AllObjectsManager()

    class Meta:
        abstract = True
        default_manager_name = "objects"
        base_manager_name = "all_objects"

    def delete(self, using=None, keep_parents=False):
        if self.is_deleted:
            return 0, {}
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save(using=using, update_fields=["is_deleted", "deleted_at"])
        label = self._meta.label
        return 1, {label: 1}

    def restore(self, using=None):
        if not self.is_deleted:
            return
        self.is_deleted = False
        self.deleted_at = None
        self.save(using=using, update_fields=["is_deleted", "deleted_at"])
