import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
        {/* Wonder Cakes Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Wonder Cakes</h3>
          <p className="text-sm leading-relaxed">
            Creating magical moments with every bite 😊
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-300 hover:text-rose-500 transition-colors duration-300">Home</Link></li>
            <li><Link to="/menu" className="text-gray-300 hover:text-rose-500 transition-colors duration-300">Menu</Link></li>
            <li><Link to="/about" className="text-gray-300 hover:text-rose-500 transition-colors duration-300">About Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact Info</h3>
          <address className="not-italic text-sm space-y-2">
            <p>Westcorner House, Along Mundi Mbingu Street</p>
            <p>0706924004</p>
            <p>info@wondercakes.com</p>
          </address>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rose-500 transition-colors duration-300 text-2xl">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rose-500 transition-colors duration-300 text-2xl">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rose-500 transition-colors duration-300 text-2xl">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        &copy; {currentYear} Wonder Cakes. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;