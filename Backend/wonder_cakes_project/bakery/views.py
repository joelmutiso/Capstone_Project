from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    """
    API view to retrieve list of products or create a new product.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
