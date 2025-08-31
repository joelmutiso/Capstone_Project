import React, { useEffect, useState } from 'react';
import useECommerceStore from '../store/useCartStore';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

// Reusable Modal Component
const Modal = ({ show, message, type, onClose }) => {
    if (!show) return null;

    const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className={`p-6 border-2 shadow-lg rounded-xl max-w-sm w-full mx-4 ${bgColor}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">{type === 'success' ? 'Success!' : 'Error'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        &times;
                    </button>
                </div>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const CartPage = () => {
    // Removed isCartLoaded state
    const [modal, setModal] = useState({ show: false, message: '', type: '' });

    // Corrected way to get properties from Zustand store
    const cart = useECommerceStore((state) => state.cart);
    const fetchCart = useECommerceStore((state) => state.fetchCart);
    const updateCartItem = useECommerceStore((state) => state.updateCartItem);
    const removeCartItem = useECommerceStore((state) => state.removeCartItem);
    const checkout = useECommerceStore((state) => state.checkout);

    const isLoggedIn = useECommerceStore((state) => state.isLoggedIn());

    useEffect(() => {
        if (isLoggedIn) {
            fetchCart();
        }
    }, [isLoggedIn, fetchCart]); // fetchCart is stable, but including it here is fine.

    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (newQuantity > 0) {
            updateCartItem(itemId, newQuantity);
        }
    };

    const handleRemoveItem = (itemId) => {
        removeCartItem(itemId);
    };

    const handleCheckout = async () => {
        try {
            const order = await checkout();
            if (order) {
                setModal({ show: true, message: 'Checkout successful! Your order has been placed.', type: 'success' });
            } else {
                setModal({ show: true, message: 'Checkout failed. Please try again.', type: 'error' });
            }
        } catch (error) {
            setModal({ show: true, message: `An unexpected error occurred: ${error.message}`, type: 'error' });
        }
    };

    const handleCloseModal = () => {
        setModal({ show: false, message: '', type: '' });
    };
    
    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-8 bg-white shadow-lg rounded-xl">
                    <h2 className="text-2xl font-bold text-gray-800">Please log in to view your cart.</h2>
                    <p className="mt-4 text-gray-600">You need to be logged in to add items to your cart and proceed to checkout.</p>
                </div>
            </div>
        );
    }
    
    if (!cart || cart.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-8 bg-white shadow-lg rounded-xl">
                    <h2 className="text-2xl font-bold text-gray-800">Your cart is empty.</h2>
                    <p className="mt-4 text-gray-600">Add some delicious cakes to your cart!</p>
                </div>
            </div>
        );
    }

    const totalCost = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Cart</h1>
                <div className="space-y-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-4">
                            <div className="flex items-center space-x-4 w-full sm:w-auto mb-4 sm:mb-0">
                                <img
                                    src={item.product.image_url || 'https://placehold.co/100x100/374151/ffffff?text=Image'}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded-xl"
                                />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                    <p className="text-gray-600 text-sm">Kshs. {item.product.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                        className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
                                    >
                                        <FaMinus size={14} />
                                    </button>
                                    <span className="font-medium text-lg w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                        className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
                                    >
                                        <FaPlus size={14} />
                                    </button>
                                </div>
                                <span className="text-lg font-bold text-rose-600 w-24 text-right">Kshs. {(item.product.price * item.quantity).toFixed(2)}</span>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-red-500 p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
                                >
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 flex justify-end items-center">
                    <span className="text-2xl font-bold text-gray-900">Total: <span className="text-rose-600">Kshs. {totalCost.toFixed(2)}</span></span>
                </div>
                
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleCheckout}
                        className="bg-rose-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-rose-600 transition-colors duration-200"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
            <Modal show={modal.show} message={modal.message} type={modal.type} onClose={handleCloseModal} />
        </div>
    );
};

export default CartPage;
