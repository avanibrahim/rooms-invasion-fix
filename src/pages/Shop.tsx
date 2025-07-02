import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const navigate = useNavigate();

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleProductClick = (productId: string, stock: number) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    const totalImages = filteredProducts.length * 2; // each product has 2 images
    if (totalImages > 0 && loadedImages >= totalImages) {
      const timeout = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [loadedImages, filteredProducts]);

  useEffect(() => {
    const maxTimeout = setTimeout(() => setLoading(false), 7000); // max wait time
    return () => clearTimeout(maxTimeout);
  }, []);

  const handleImageLoad = () => {
    setLoadedImages(prev => prev + 1);
  };

  

  return (
    <>
      {loading && <LoadingScreen transparent />}
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-4xl font-semibold text-gray-900 mb-4">SHOP</h1>
          </div>

          <div className="mb-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-auto px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map((product) => {
                const isOutOfStock = (product.stock || 0) === 0;
                return (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id, product.stock || 0)}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:transform hover:-translate-y-1"
                  >
                    <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        onLoad={handleImageLoad}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                      {product.images[1] && (
                        <img
                          src={product.images[1]}
                          alt={`${product.name} - back view`}
                          onLoad={handleImageLoad}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      )}
                      {isOutOfStock && (
                        <div className="absolute top-2 left-2 z-10">
                          <span className="bg-red-800 text-white text-xs px-2 py-1 rounded-full font-medium">
                            OUT OF STOCK
                          </span>
                        </div>
                      )}
                      {!isOutOfStock && (product.stock || 0) <= 5 && (
                        <div className="absolute top-2 left-2 z-10">
                          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                            LOW STOCK
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                    </div>
                    <div className="p-3 space-y-2">
                      <h3 className="font-semibold text-sm md:text-base line-clamp-2 transition-colors text-gray-900 group-hover:text-gray-700">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
  <p className="font-bold text-sm md:text-base text-gray-900">
    Rp {product.price.toLocaleString('id-ID')}
  </p>
  {product.originalPrice && product.originalPrice > product.price && (
    <p className="text-sm line-through text-gray-500">
      Rp {product.originalPrice.toLocaleString('id-ID')}
    </p>
  )}
</div>

                      <p className="text-gray-500 text-xs md:text-sm">
                        {product.brand}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Shop;