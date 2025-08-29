from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db import transaction
from .models import Orders, OrderItems
from .serializers import OrdersSerializer
from cart.models import CartItem

class CheckoutView(generics.CreateAPIView): # API to handle the checkout process
    serializer_class = OrdersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # 1. Retrieve the user's cart items
        user = self.request.user
        cart_items = CartItem.objects.filter(cart__user=user)

        # 2. Check if the cart is empty
        if not cart_items:
            return Response({'error': 'Your cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # We use a transaction to ensure all database operations succeed or fail together.
            with transaction.atomic():
                # 3. Calculate the total price of all items
                total_price = sum(item.product.price * item.quantity for item in cart_items)
                
                # 4. Create a new Order object
                order = Orders.objects.create(user=user, total_price=total_price)

                # 5. Create OrderItem objects from the cart items
                for item in cart_items:
                    OrderItems.objects.create(
                        order=order,
                        product=item.product,
                        quantity=item.quantity,
                        price_at_checkout=item.product.price
                    )
                
                # 6. Clear the user's cart
                cart_items.delete()
        
        except Exception as e:
            # Handle any potential errors during the process
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # 7. Return the new order as a success response
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

