from django.urls import path
from .views import CartView, AddCartItemView, UpdateCartItemView, RemoveCartItemView

urlpatterns = [
    path('', CartView.as_view(), name='cart-detail'),
    path('add/', AddCartItemView.as_view(), name='cart-add'),
    path('update/<int:pk>/', UpdateCartItemView.as_view(), name='cart-update'),
    path('remove/<int:pk>/', RemoveCartItemView.as_view(), name='cart-remove'),
]