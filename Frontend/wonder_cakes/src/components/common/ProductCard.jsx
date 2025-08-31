import React from 'react';
import useECommerceStore from '../../store/useCartStore';

const ProductCard = ({ product }) => {
    
    const { addToCart, token } = useECommerceStore();

    const handleAddToCart = async () => {
        // You'll need the product's primary key (pk) to add it to the cart
        const productId = product.id; 
        
        if (token) {
            await addToCart(productId);
            // Optionally, you can add a small visual feedback here like a toast message
            // or an animation to confirm the item was added.
        } else {
            // Handle case where user is not logged in, e.g., redirect to login or show a message.
            alert('Please log in to add items to your cart.');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col transform transition-transform duration-300 hover:scale-105">
            <img
                src={product.image_url || 'https://placehold.co/400x400/374151/ffffff?text=Image'}
                className="w-full h-48 object-cover rounded-xl mb-4"
                alt={product.name}
            />
            <div className="flex-grow">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-600 my-2 text-sm">{product.description}</p>
            </div>
            <div className="mt-auto flex justify-between items-center">
                <span className="text-lg font-semibold text-rose-500">Kshs. {product.price.toFixed(2)}</span>
                <button
                    onClick={handleAddToCart}
                    className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-full text-xs shadow-md hover:bg-rose-500 transition-colors duration-200"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;



