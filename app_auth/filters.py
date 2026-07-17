import django_filters
from django.contrib.auth import get_user_model


User = get_user_model()


class UserFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method="filter_search")
    username = django_filters.CharFilter(field_name="username", lookup_expr="icontains")
    email = django_filters.CharFilter(field_name="email", lookup_expr="icontains")
    is_active = django_filters.BooleanFilter()
    is_staff = django_filters.BooleanFilter()
    date_joined_after = django_filters.DateTimeFilter(field_name="date_joined", lookup_expr="gte")
    date_joined_before = django_filters.DateTimeFilter(field_name="date_joined", lookup_expr="lte")

    class Meta:
        model = User
        fields = ["username", "email", "is_active", "is_staff"]

    def filter_search(self, queryset, name, value):
        return queryset.filter(username__icontains=value) | queryset.filter(email__icontains=value)
