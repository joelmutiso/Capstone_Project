import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';
import MenuPage from './pages/MenuPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import CartPage from './pages/CartPage.jsx';
import ProductListingPage from './pages/ProductListingPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<ProductListingPage />} />
      </Routes>
    </Router>
  );
}

export default App;

