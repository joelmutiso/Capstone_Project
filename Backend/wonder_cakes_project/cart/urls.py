from django.urls import path
from .views import CartView, AddCartItemView, UpdateCartItemView, RemoveCartItemView

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart-detail'),
    path('cart/add/', AddCartItemView.as_view(), name='cart-add'),
    path('cart/update/<int:pk>/', UpdateCartItemView.as_view(), name='cart-update'),
    path('cart/remove/<int:pk>/', RemoveCartItemView.as_view(), name='cart-remove'),
]