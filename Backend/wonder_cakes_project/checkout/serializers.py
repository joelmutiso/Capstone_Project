from rest_framework import serializers
from .models import Orders, OrderItems
from products.models import Product

class OrderItemsSerializer(serializers.ModelSerializer): # Serializer for the OrderItems model
    class Meta:
        model = OrderItems
        fields = ['product', 'quantity', 'price_at_checkout']
        read_only_fields = ['price_at_checkout']

class OrdersSerializer(serializers.ModelSerializer): # Serializer for the Orders model
    items = OrderItemsSerializer(many=True, read_only=True)
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Orders
        fields = ['id', 'user', 'items', 'total_price', 'created_at']
        read_only_fields = ['total_price']
