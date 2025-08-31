from rest_framework import generics, permissions
from .models import Product
from .serializers import ProductSerializer
from rest_framework import filters

class ProductListCreateView(generics.ListCreateAPIView): # API view to retrieve list of products or create a new product.
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView): # API view to retrieve, update or delete a product.
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]



