import React, { useEffect, useState } from 'react';
import ProductCard from '../components/common/ProductCard';

const MenuPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError(new Error('Authentication token not found. Please log in again.'));
                setLoading(false);
                return;
            }

            try {
                // Django API products endpoint
                const response = await fetch('http://localhost:8000/api/products/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-2xl text-gray-700">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl text-red-500">
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <section className="py-20 px-4 md:px-8 lg:px-16">
                <h1 className="text-5xl font-extrabold text-center mb-12 text-purple-600">Our Delicious Menu</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MenuPage;
