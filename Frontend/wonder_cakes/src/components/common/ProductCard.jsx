import React from 'react';

const ProductCard = ({ product }) => {
    return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
        <img src={product.image_url || 'YOUR_PLACEHOLDER_URL_HERE'} className="w-full h-48 object-cover rounded-lg mb-4" alt={product.name} />

        <div className="flex-grow">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600 my-2">{product.description}</p>
        </div>

        <div className="mt-auto">
            <span className="text-lg font-semibold text-indigo-600">${product.price}</span>
        </div>
    </div>
);
};

export default ProductCard;


