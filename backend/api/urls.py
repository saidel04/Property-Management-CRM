from django.urls import path
from . import views

urlpatterns = [
    path("properties/", views.PropertyListCreate.as_view(), name="property-list"),
    path("properties/<int:pk>/", views.PropertyDelete.as_view(), name="property-delete"),

    path("units/", views.UnitListCreate.as_view(), name="unit-list"),
    path("units/<int:pk>/", views.UnitDelete.as_view(), name="unit-delete"),

    path("tenants/", views.TenantListCreate.as_view(), name="tenant-list"),
    path("tenants/<int:pk>/", views.TenantDelete.as_view(), name="tenant-delete"),

    path("owners/", views.OwnerListCreate.as_view(), name="owner-list"),
    path("owners/<int:pk>/", views.OwnerDelete.as_view(), name="owner-delete"),

    path("maintenances/", views.MaintenanceRequestListCreate.as_view(), name="maintenance-list"),
    path("maintenances/<int:pk>/", views.MaintenanceRequestDelete.as_view(), name="maintenance-delete"),

    path("payments/", views.PaymentListCreate.as_view(), name="payment-list"),
    path("payments/<int:pk>/", views.PaymentDelete.as_view(), name="payment-delete"),
]
