import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import CartSidebar from './CartSidebar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Lookbook', href: '/Lookbook' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      setShouldRenderMenu(true);
    } else {
      const timeout = setTimeout(() => {
        setShouldRenderMenu(false);
      }, 300); // sesuaikan dengan durasi animasi Tailwind
      return () => clearTimeout(timeout);
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img
                  src="/model/logo.png"
                  alt="ROOMS Logo"
                  className="h-9 w-auto"
                  draggable="false"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Cart */}
              <button
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION: Selalu Render, Class Transisi */}
        <div
  className={`
    md:hidden fixed top-0 left-0 w-full bg-white z-40
    origin-top transform
    transition-all duration-300 ease-in-out
    ${isMenuOpen
      ? 'translate-y-0 opacity-100 pointer-events-auto'
      : '-translate-y-full opacity-0 pointer-events-none'}    
  `}
  style={{ transformOrigin: 'top' }}
>
  <div className="py-4 border-b border-gray-300 w-full">
    <div className="flex items-center justify-between px-4">
      <Link to="/" onClick={() => setIsMenuOpen(false)}>
        <img
          src="/model/logo.png"
          alt="ROOMS Logo"
          className="h-9 w-auto"
          draggable="false"
        />
      </Link>
      <button className="p-2" onClick={() => setIsMenuOpen(false)}>
        <X size={24} />
      </button>
    </div>

    <div className="flex flex-col space-y-3 w-full px-4 mt-4 border-t border-gray-300">
      {navItems.map((item, idx) => (
        <Link
          key={item.label}
          to={item.href}
          className={`
            text-gray-700 hover:text-gray-900 font-medium py-2
            transform transition-all duration-300
            ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}
          `}
          style={{ transitionDelay: `${idx * 90 + 100}ms` }}
          onClick={() => setIsMenuOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
</div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
