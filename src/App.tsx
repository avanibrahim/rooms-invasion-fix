import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Index';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Lookbook from './pages/Lookbook';
import Contact from './pages/Contact';
import CheckOut from './pages/CheckOut';
import CartSidebar from './components/CartSidebar';
import { useCartStore } from './store/cartStore';
import { Toaster } from './components/ui/toaster';
import ScrollToTop from './components/ScrollToTop'; 
import AdminDashboard from '@/pages/admin/Dashboard';
import Login from '@/pages/admin/Login';
import NotFound from './pages/NotFound';

// DIHAPUS: import { seedProducts } ... dan useEffect ...

function App() {
  const { isOpen, toggleCart } = useCartStore();

  return (
    <Router>
      <div className="App">
        <ScrollToTop /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/takezon" element={<AdminDashboard />} />
          <Route path="/in" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <CartSidebar isOpen={isOpen} onClose={toggleCart} />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
