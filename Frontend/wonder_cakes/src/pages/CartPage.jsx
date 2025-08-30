import React from 'react';
import useECommerceStore from '../store/useCartStore';

const CartPage = () => {
  // Get the cart items from the Zustand store.
  const cart = useECommerceStore((state) => state.cart);

  // Calculate the total price of all items in the cart.
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-100 min-h-screen font-sans py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Your Cart</h2>
        
        {/* Conditional rendering based on cart content */}
        {cart.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-500">Your cart is currently empty. Start shopping to add items!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* List all items in the cart */}
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center">
                  <img
                    src={item.image_url || 'https://placehold.co/100x100/374151/ffffff?text=Image'}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
                <span className="font-bold text-rose-500">${item.price.toFixed(2)}</span>
              </div>
            ))}

            {/* Total price section */}
            <div className="text-right pt-6">
              <span className="text-2xl font-bold text-gray-900">Total: ${total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;