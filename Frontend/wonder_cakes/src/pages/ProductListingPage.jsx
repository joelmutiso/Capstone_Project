import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';

const ProductListingPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // API Bakery endpoint for products.
                const response = await fetch('http://127.0.0.1:8000/api/bakery/products/');

                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.statusText}`);
                }
                const data = await response.json();

                const productsWithNumbers = data.map(product => ({
                    ...product,
                    price: parseFloat(product.price), // Ensure price is a number
                }));

                setProducts(productsWithNumbers);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center py-20">Loading cakes...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error.message}</div>;
    }

    return (
        <div className="font-sans antialiased text-gray-800">
            {/* Hero Section */}
            <header className="bg-gray-800 text-white py-24 text-center">
                <div className="container mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Taste the Magic</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        Discover our handcrafted cakes made with love and the finest ingredients
                    </p>
                    <Link to="/menu" className="inline-block px-8 py-3 rounded-full font-semibold bg-rose-500 text-white hover:bg-rose-600 transition-colors duration-300">
                        Shop Our Cakes
                    </Link>
                </div>
            </header>

            {/* Featured Products Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Cakes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
                        {products.length === 0 ? (
                            <p className="text-center text-gray-500 col-span-full">No products found. Please use the "Create" link to add a new product.</p>
                        ) : (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About Wonder Cakes</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        For over 20 years, Wonder Cakes has been creating magical moments through our handcrafted desserts. 
                        Every cake is made with premium ingredients and baked fresh daily in our kitchen.
                    </p>
                    <Link to="/about" className="inline-block px-6 py-3 rounded-full font-semibold bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-300">
                        Learn More
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ProductListingPage;
