from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from bakery.models import Product

class CartView(generics.RetrieveAPIView):  # API View to retrieve the user's cart
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        cart, created = Cart.objects.get_or_create(user=user)
        return cart

class AddCartItemView(generics.CreateAPIView):  # API View to add items to the cart
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        cart, created = Cart.objects.get_or_create(user=user)

        try:
            cart_item = CartItem.objects.get(cart=cart, product=product)
            cart_item.quantity += int(quantity)
            cart_item.save()
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            cart_item = CartItem.objects.create(
                cart=cart,
                product=product,
                quantity=quantity
            )
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class UpdateCartItemView(generics.UpdateAPIView): # API View to update the quantity of a cart item
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        quantity = request.data.get('quantity')
        if quantity is None:
            return Response({'error': 'Quantity is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            new_quantity = int(quantity)
            if new_quantity <= 0:
                return Response({'error': 'Quantity must be a positive integer.'}, status=status.HTTP_400_BAD_REQUEST)
        except (ValueError, TypeError):
            return Response({'error': 'Quantity must be a valid number.'}, status=status.HTTP_400_BAD_REQUEST)

        instance = self.get_object()
        
        if instance.cart.user != self.request.user:
            return Response({'error': 'You do not have permission to update this item.'}, status=status.HTTP_403_FORBIDDEN)

        instance.quantity = new_quantity
        instance.save()
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RemoveCartItemView(generics.DestroyAPIView): # API View to remove items from the cart
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.cart.user != self.request.user:
            return Response({'error': 'You do not have permission to delete this item.'}, status=status.HTTP_403_FORBIDDEN)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)