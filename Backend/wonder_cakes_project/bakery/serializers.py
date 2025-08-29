from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer): # Serializer for Product model
    display_price = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image_url', 'stock', 'display_price'] # Fields to be serialized
        read_only_fields = ['price']

    def get_display_price(self, obj): # Method to get the display price
        return f"KSh {obj.price}"
