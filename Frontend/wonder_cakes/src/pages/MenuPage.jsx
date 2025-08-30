import React, { useEffect, useState } from 'react';
import ProductCard from '../components/common/ProductCard';

const MenuPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/bakery/products/'); // API Bakery endpoint for products.

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                const productsWithNumbers = data.map(product => ({
                    ...product,
                    price: parseFloat(product.price),
                }));
                
                setProducts(productsWithNumbers);
                setFilteredProducts(productsWithNumbers);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter(product => {
            const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesName;
        });
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

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
        <div className="bg-gray-100 min-h-screen font-sans py-20 px-4 md:px-8 lg:px-16">
            <h1 className="text-5xl font-extrabold text-center mb-6 text-gray-900">Our Delicious Menu</h1>
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search cakes, e.g., 'Chocolate' or 'Red Velvet'"
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {filteredProducts.length === 0 && !loading && !error && (
                <div className="text-center text-gray-500 text-xl mt-10">
                    No cakes found matching your search. 🍰
                </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default MenuPage;
