from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .serializers import OrdersSerializer
from cart.models import CartItem

class CheckoutView(generics.CreateAPIView): # View to handle the checkout process
    serializer_class = OrdersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # 1. Retrieve the user's cart items
        user = self.request.user
        cart_items = CartItem.objects.filter(cart__user=user)

        # 2. Check if the cart is empty
        if not cart_items:
            return Response({'error': 'Your cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)

        # 3. Prepare the data for the serializer
        items_data = [
            {'product': item.product.id, 'quantity': item.quantity}
            for item in cart_items
        ]

        serializer = self.get_serializer(data={'items_data': items_data})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()

        response_serializer = OrdersSerializer(order, context={'request': request})
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


