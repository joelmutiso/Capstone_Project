import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import useECommerceStore from '../store/useCartStore'; // Import the Zustand store

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const login = useECommerceStore((state) => state.login); // Get the login action from the store

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/user/login/', { // API endpoint for login
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.non_field_errors?.[0] || 'Failed to log in. Please check your credentials.';
                throw new Error(errorMessage);
            }

            const data = await response.json();
            const token = data.token;
            
            // Use the login action from the Zustand store
            login(token);

            navigate('/menu');

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="text-center">
                    <FaUserCircle className="mx-auto text-5xl text-rose-500 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500">Log in to view our full menu and manage your orders.</p>
                </div>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-rose-500 focus:border-rose-500 transition-colors"
                            placeholder="Enter your username"
                            required
                            aria-label="Username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-rose-500 focus:border-rose-500 transition-colors"
                            placeholder="Enter your password"
                            required
                            aria-label="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2.5 text-lg font-semibold text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition-colors duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                
                <div className="text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-rose-500 hover:text-rose-600 font-medium transition-colors duration-200">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


