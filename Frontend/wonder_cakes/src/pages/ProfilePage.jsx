import React from 'react';
import { useNavigate } from 'react-router-dom';
import useECommerceStore from '../store/useCartStore';
import { FaUserCircle } from 'react-icons/fa';

const ProfilePage = () => {
    const navigate = useNavigate();
    const isLoggedIn = useECommerceStore((state) => state.isLoggedIn());
    const logout = useECommerceStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">You are not logged in.</h2>
                    <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full py-2.5 text-lg font-semibold text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition-colors duration-300"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-200 text-center">
                <FaUserCircle className="mx-auto text-6xl text-rose-500 mb-4" />
                <h2 className="text-3xl font-bold text-gray-800">Welcome to Your Profile</h2>
                <p className="text-gray-500">This is a placeholder for your user profile. You can add your order history, account settings, and more here!</p>
                <button
                    onClick={handleLogout}
                    className="w-full py-2.5 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
