from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Property(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    property_type = models.CharField(max_length=50, choices=[('Apartment', 'Apartment'), ('House', 'House'), ('Commercial', 'Commercial')])
    num_units = models.PositiveBigIntegerField()
    owner = models.ForeignKey('Owner', on_delete=models.SET_NULL, null = True, blank= True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')

    def __str__(self):
        return self.address



class Unit(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    unit_number = models.CharField(max_length=20)
    rent_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_occupied = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='units')

    def __str__(self):
        return f"{self.property.address} Unit Number {self.unit_number}"


class Tenant(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    unit = models.OneToOneField(Unit, on_delete=models.SET_NULL, null = True, blank= True)
    lease_start = models.DateField()
    lease_end = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tenants')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Owner(models.Model):
    name = models.CharField(max_length=255)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=15)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owners')
    
    def __str__(self):
        return self.name


class MaintenanceRequest(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)
    description = models.TextField()
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Resolved', 'Resolved')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='maintenance_requests')

    def __str__(self):
        return f"{self.unit.property.address}, {self.description}, Status: {self.status}"


class Payment(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10,decimal_places=2)
    date = models.DateField()
    payment_method = models.CharField(max_length=50, choices=[('Credit', 'Credit'), ('Debit', 'Debit'), ('Cash', 'Cash'), ('E-transfer', 'E-transfer'), ('Cheque', 'Cheque')])
    notes = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')

    def __str__(self):
        return f"{self.tenant.last_name}, ${self.amount}, {self.date}"

    