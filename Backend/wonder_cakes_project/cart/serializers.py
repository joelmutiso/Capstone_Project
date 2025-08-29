from rest_framework import serializers
from .models import Cart, CartItem
from bakery.models import Product

class ProductSerializer(serializers.ModelSerializer): # Serializer for Product model
    class Meta:
        model = Product
        fields = ['id', 'name', 'price']

class CartItemSerializer(serializers.ModelSerializer): # Serializer for CartItem model
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all()
    )
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

class CartSerializer(serializers.ModelSerializer): # Serializer for Cart model
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'items', 'created_at', 'updated_at']

