from rest_framework import serializers
from django.db import transaction
from .models import Orders, OrderItems
from bakery.models import Product

class OrderItemsSerializer(serializers.ModelSerializer): # Serializer for individual order items
    product = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = OrderItems
        fields = ['product', 'quantity', 'price_at_checkout']
        read_only_fields = ['price_at_checkout']

class OrdersSerializer(serializers.ModelSerializer): # Serializer for the Orders model
    items = OrderItemsSerializer(many=True, read_only=True)
    user = serializers.ReadOnlyField(source='user.username')

    items_data = serializers.ListField(
        child=serializers.DictField(
            child=serializers.IntegerField(min_value=1)
        ), write_only=True
    )

    class Meta:
        model = Orders
        fields = ['id', 'user', 'items', 'total_price', 'created_at', 'items_data']
        read_only_fields = ['total_price']

    @transaction.atomic
    def create(self, validated_data):
        """
        Custom create method to handle creating an order and its associated items.
        """
        items_data = validated_data.pop('items_data')
        total_price = 0
        order_items = []

        # Calculate the total price based on the product's current price
        # and create OrderItems instances.
        for item in items_data:
            try:
                product = Product.objects.get(id=item['product'])
            except Product.DoesNotExist:
                raise serializers.ValidationError(f"Product with ID {item['product']} does not exist.")
            
            price = product.price
            quantity = item['quantity']
            item_price = price * quantity
            total_price += item_price
            
            order_items.append(OrderItems(
                product=product,
                quantity=quantity,
                price_at_checkout=price
            ))

        # Create the main Orders instance.
        order = Orders.objects.create(
            user=self.context['request'].user,
            total_price=total_price,
            **validated_data
        )

        # Bulk create the order items for efficiency.
        for order_item in order_items:
            order_item.order = order
        OrderItems.objects.bulk_create(order_items)

        return order
