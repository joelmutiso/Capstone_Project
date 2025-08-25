from django.urls import path
from .views import CartView, AddCartItemView

urlpatterns = [
    path('', CartView.as_view(), name='cart'),
    path('add/', AddCartItemView.as_view(), name='add_cart_item'),
]