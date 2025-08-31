import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import useECommerceStore from '../../store/useCartStore';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = useECommerceStore((state) => state.isLoggedIn());
    const cart = useECommerceStore((state) => state.cart);
    const fetchCart = useECommerceStore((state) => state.fetchCart);

    // Fetch the cart data when the component mounts and the user is logged in
    useEffect(() => {
        if (isLoggedIn) {
            fetchCart();
        }
    }, [isLoggedIn, fetchCart]);

    // Calculate the total quantity of all items in the cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50 font-sans">
            <div className="container mx-auto flex items-center justify-between">
                
                {/* Brand/Logo */}
                <Link to="/" className="text-xl font-bold tracking-tight">Wonder Cakes</Link>
                
                {/* Mobile Menu, Cart, and User Container */}
                <div className="flex items-center space-x-4 md:hidden">
                    {/* Cart Icon */}
                    <Link to="/cart" aria-label="View Cart" className="relative hover:text-rose-400 transition-colors duration-200">
                        <FaShoppingCart className="h-6 w-6" />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold px-2 rounded-full transform scale-75">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {/* Conditional User/Login Icon */}
                    {isLoggedIn ? (
                        <Link to="/profile" aria-label="User Profile" className="hover:text-rose-400 transition-colors duration-200">
                            <FaUserCircle className="h-6 w-6" />
                        </Link>
                    ) : (
                        <Link to="/login" aria-label="Login" className="hover:text-rose-400 transition-colors duration-200">
                            <FaUserCircle className="h-6 w-6" />
                        </Link>
                    )}
                    
                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        )}
                    </button>
                </div>

                {/* Navigation Links (Desktop only) */}
                <div className="hidden md:flex flex-grow justify-center space-x-8">
                    <Link to="/" className="hover:text-rose-400 transition-colors duration-200">Home</Link>
                    <Link to="/menu" className="hover:text-rose-400 transition-colors duration-200">Menu</Link>
                    <Link to="/about" className="hover:text-rose-400 transition-colors duration-200">About Us</Link>
                </div>

                {/* Cart and User Icons (Desktop) - Hidden on mobile */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Cart Icon */}
                    <Link to="/cart" aria-label="View Cart" className="relative hover:text-rose-400 transition-colors duration-200">
                        <FaShoppingCart className="h-6 w-6" />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold px-2 rounded-full transform scale-75">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    
                    {/* Conditional User/Login Icon */}
                    {isLoggedIn ? (
                        <Link to="/profile" aria-label="User Profile" className="hover:text-rose-400 transition-colors duration-200">
                            <FaUserCircle className="h-6 w-6" />
                        </Link>
                    ) : (
                        <Link to="/login" aria-label="Login" className="hover:text-rose-400 transition-colors duration-200">
                            <FaUserCircle className="h-6 w-6" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden ${isMenuOpen ? 'flex' : 'hidden'} flex-col space-y-4 pt-4`}>
                <Link to="/" className="block py-2 px-4 text-sm hover:bg-gray-800 rounded-md transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/menu" className="block py-2 px-4 text-sm hover:bg-gray-800 rounded-md transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Menu</Link>
                <Link to="/about" className="block py-2 px-4 text-sm hover:bg-gray-800 rounded-md transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                <Link to="/cart" className="block py-2 px-4 text-sm hover:bg-gray-800 rounded-md transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Cart ({totalItems})</Link>
                {isLoggedIn ? (
                    <Link to="/profile" className="block py-2 px-4 text-sm hover:bg-gray-800 rounded-md transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                ) : (
                    <Link to="/login" className="block py-2 px-4 text-sm hover:bg-gray-800 rounded-md transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
