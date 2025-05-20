from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

# Shared base serializer for models with a user ForeignKey
class UserOwnedModelSerializer(serializers.ModelSerializer):
    class Meta:
        extra_kwargs = {"user": {"read_only": True}}

# User Serializer with password hashing
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Owner Serializer (used in Property nested output)
class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        # do NOT ask the client to send user
        fields = ["id", "name", "contact_email", "contact_phone", "user"]
        extra_kwargs = {"user": {"read_only": True}}

# Property Serializer with nested owner output
class PropertySerializer(UserOwnedModelSerializer):
    owner = OwnerSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(
        source='owner',
        queryset=Owner.objects.all(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Property
        fields = ["id", "name", "address", "property_type", "num_units", "owner", "owner_id", "user"]
        extra_kwargs = {"user": {"read_only": True}}

class UnitSerializer(UserOwnedModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    class Meta:
        model = Unit
        fields = ["id", "property", "unit_number", "rent_amount", "is_occupied", "user"]
        extra_kwargs = {"user": {"read_only": True}}

class TenantSerializer(UserOwnedModelSerializer):
    unit = serializers.PrimaryKeyRelatedField(queryset=Unit.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Tenant
        fields = ["id", "first_name", "last_name", "email", "phone_number", "unit", "lease_start", "lease_end", "user"]
        extra_kwargs = {"user": {"read_only": True}}


class MaintenanceRequestSerializer(UserOwnedModelSerializer):
    tenant = serializers.PrimaryKeyRelatedField(queryset=Tenant.objects.all())
    unit = serializers.PrimaryKeyRelatedField(queryset=Unit.objects.all())

    class Meta:
        model = MaintenanceRequest
        fields = ["id", "tenant", "unit", "description", "status", "created_at", "updated_at", "user"]
        extra_kwargs = {"user": {"read_only": True}}

class PaymentSerializer(UserOwnedModelSerializer):
    tenant = serializers.PrimaryKeyRelatedField(queryset=Tenant.objects.all())

    class Meta:
        model = Payment
        fields = ["id", "tenant", "amount", "date", "payment_method", "notes", "user"]
        extra_kwargs = {"user": {"read_only": True}}
