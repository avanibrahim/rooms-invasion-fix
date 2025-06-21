import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
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
    // Hapus pengecekan stock, biarkan semua produk bisa dibuka
    navigate(`/product/${productId}`);
  };
  

  return (
    <div className="min-h-screen bg-white">
  <Header />
  <main className="container mx-auto px-4 py-8">
    {/* Page Header */}
    <div className="mb-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Discover our complete collection of fashionable clothing and accessories.
        Find the perfect style that matches your personality.
      </p>
    </div>

    {/* Search and Category Filter */}
    <div className="mb-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        {/* Search */}
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

        {/* Category Filter */}
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

    {/* Results Count */}
    <div className="text-center mb-8">
      <p className="text-gray-600">
        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
      </p>
    </div>

    {/* Products Grid */}
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
          
              {/* Product Image - Square */}
              <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                />

                {/* Second image on hover - untuk semua produk */}
                {product.images[1] && (
                  <img
                    src={product.images[1]}
                    alt={`${product.name} - back view`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                )}

                {/* Out of Stock Badge */}
                {isOutOfStock && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Low Stock Badge */}
                {!isOutOfStock && (product.stock || 0) <= 5 && (product.stock || 0) > 0 && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Only {product.stock} left
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-3 space-y-2">
                {/* Product Name */}
                <h3 className="font-semibold text-sm md:text-base line-clamp-2 transition-colors text-gray-900 group-hover:text-gray-700">
                  {product.name}
                </h3>

                {/* Product Description */}
                <p className="text-xs md:text-sm line-clamp-2 text-gray-600">
                  {product.description}
                </p>

                {/* Price */}
                <p className="font-bold text-sm md:text-base text-gray-900">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>

                {/* Brand */}
                <p className="text-gray-500 text-xs md:text-sm">
                  {product.brand}
                </p>

                {/* Stock Status */}
                <div className="pt-1">
                  {isOutOfStock ? (
                    <span className="text-red-500 text-xs font-medium">Out of Stock</span>
                  ) : (product.stock || 0) <= 5 ? (
                    <span className="text-blue-600 text-xs font-medium">
                      Low Stock ({product.stock} left)
                    </span>
                  ) : (
                    <span className="text-green-500 text-xs font-medium">In Stock</span>
                  )}
                </div>
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

  );
};

export default Shop;
