import { create } from 'zustand';

const useECommerceStore = create((set, get) => ({
    // Authentication state
    token: localStorage.getItem('token') || null,

    login: (token) => {
        localStorage.setItem('token', token);
        set({ token });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ token: null });
    },

    isLoggedIn: () => {
        return !!get().token;
    },

    // Cart state
    cart: [],
    
    // Asynchronous action to fetch the cart from the backend
    fetchCart: async () => {
        const token = get().token;
        if (!token) return;

        try {
            const response = await fetch('http://localhost:8000/api/cart/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                set({ cart: data.items });
            } else {
                console.error('Failed to fetch cart:', response.statusText);
                set({ cart: [] });
            }
        } catch (error) {
            console.error('Network error fetching cart:', error);
            set({ cart: [] });
        }
    },

    // Asynchronous action to add a product to the cart
    addToCart: async (productId) => {
        const token = get().token;
        if (!token) {
            console.error('Not logged in. Cannot add to cart.');
            return;
        }
        
        // This is the key change: send 'product_id' instead of 'product'
        try {
            console.log("Sending to backend:", { product_id: productId, quantity: 1 });
            const response = await fetch('http://localhost:8000/api/cart/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({ product_id: productId, quantity: 1 }),
            });

            if (response.ok) {
                await get().fetchCart();
                return true;
            } else {
                const errorData = await response.json();
                console.error('Failed to add to cart:', errorData);
                return false;
            }
        } catch (error) {
            console.error('Network error adding to cart:', error);
            return false;
        }
    },

    // Asynchronous action to update a cart item
    updateCartItem: async (itemId, quantity) => {
        const token = get().token;
        if (!token) {
            console.error('Not logged in. Cannot update cart.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/cart/update/${itemId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({ quantity }),
            });
            if (response.ok) {
                await get().fetchCart();
            } else {
                console.error('Failed to update cart item:', response.statusText);
            }
        } catch (error) {
            console.error('Network error updating cart item:', error);
        }
    },

    // Asynchronous action to remove an item from the cart
    removeCartItem: async (itemId) => {
        const token = get().token;
        if (!token) {
            console.error('Not logged in. Cannot remove from cart.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/cart/remove/${itemId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            if (response.ok) {
                await get().fetchCart();
            } else {
                console.error('Failed to remove cart item:', response.statusText);
            }
        } catch (error) {
            console.error('Network error removing cart item:', error);
        }
    },
    
    // Asynchronous action to process checkout
    checkout: async () => {
        const token = get().token;
        if (!token) {
            console.error('Not logged in. Cannot checkout.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/checkout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                // The body is often empty for checkout since the server uses the user's cart
                body: JSON.stringify({}), 
            });

            if (response.ok) {
                const data = await response.json();
                await get().fetchCart(); // Refresh cart to show it's empty
                return data;
            } else {
                const errorData = await response.json();
                console.error('Checkout failed:', errorData);
                return null;
            }
        } catch (error) {
            console.error('Network error during checkout:', error);
            return null;
        }
    },
}));

export default useECommerceStore;
