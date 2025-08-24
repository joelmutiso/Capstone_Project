import React, { use, useEffect, useState } from 'react';

const Menupage = () => {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products/'); // fetch HTTP GET request to our API endpoint
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
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-purple-600">Our Delicious Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <span className="text-3xl font-bold text-purple-600">${product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menupage;
