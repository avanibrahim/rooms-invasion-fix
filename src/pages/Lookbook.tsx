import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Lookbook = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedItems, setLikedItems] = useState<string[]>([]);

  // Sample lookbook data - ganti dengan data sebenarnya
  const lookbookItems = [
    {
        title: 'Summer Vibes',
        category: 'casual',
        image: '/lookbook/new1.png',
        description: 'Perfect casual look for summer days',
        likes: 48,
    },
    {
        title: 'Summer Vibes',
        category: 'casual',
        image: '/lookbook/new2.png',
        description: 'Perfect casual look for summer days',
        likes: 52,
    },
    {
        title: 'Summer Vibes',
        category: 'casual',
        image: '/lookbook/new3.png',
        description: 'Perfect casual look for summer days',
        likes: 50,
    },
    {
      id: '1',
      title: 'Summer Vibes',
      category: 'casual',
      image: '/lookbook/model1.jpg',
      description: 'Perfect casual look for summer days',
       // Product IDs yang digunakan
      likes: 45,
    },
    {
      id: '2',
      title: 'Office Ready',
      category: 'formal',
      image: '/lookbook/model2.jpg',
      description: 'Professional look for the workplace',
      products: ['3', '4'],
      likes: 32,
    },
    {
      id: '3',
      title: 'Street Style',
      category: 'street',
      image: '/lookbook/model3.jpg',
      description: 'Urban street style inspiration',
      products: ['5', '6'],
      likes: 67,
    },
    
    {
      id: '4',
      title: 'Party Time',
      category: 'party, casual',
      image: '/lookbook/model4.jpg',
      description: 'Dress to impress at any party',
      products: ['7', '8'],
      likes: 23,
    },
    {
      id: '5',
      title: 'Party Time',
      category: 'party',
      image: '/lookbook/model5.jpg',
      description: 'Dress to impress at any party',
      products: ['9', '10'],
      likes: 23,
    },
    {
      id: '6',
      title: 'Party Time',
      category: 'party',
      image: '/lookbook/model6.jpg',
      description: 'Dress to impress at any party',
      products: ['11', '12'],
      likes: 23,
    },
    {
      id: '7',
      title: 'Party Time',
      category: 'party',
      image: '/lookbook/model7.jpg',
      description: 'Dress to impress at any party',
      products: ['13', '14'],
      likes: 23,
    },
    {
      id: '8',
      title: 'Party Time',
      category: 'party',
      image: '/lookbook/model8.jpg',
      description: 'Dress to impress at any party',
      products: ['15', '16'],
      likes: 23,
    },
    {
      id: '9',
      title: 'Party Time',
      category: 'casual',
      image: '/lookbook/model9.jpg',
      description: 'Dress to impress at any party',
      products: ['17', '18'],
      likes: 23,
    },
    // Tambahkan lebih banyak items sesuai kebutuhan
  ];

  const categories = ['all', 'casual', 'formal', 'street'];

  const filteredItems = selectedCategory === 'all' 
    ? lookbookItems 
    : lookbookItems.filter(item => item.category === selectedCategory);

  const handleLike = (itemId: string) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleViewProducts = (productIds: string[]) => {
    // Navigate to shop with filter or show products modal
    navigate('/shop');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lookbook
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get inspired by our curated style collections. Discover how to mix and match 
            our pieces to create the perfect look for any occasion.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex justify-center">
          <div className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-full">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category === 'all' ? 'All Styles' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {filteredItems.length} {filteredItems.length === 1 ? 'look' : 'looks'} found
          </p>
        </div>

        {/* Lookbook Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        likedItems.includes(item.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/80 text-gray-700 hover:bg-white'
                      }`}
                    >
                      <Heart size={16} fill={likedItems.includes(item.id) ? 'currentColor' : 'none'} />
                    </button>
                    
                    <button
                      onClick={() => handleViewProducts(item.products)}
                      className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-white backdrop-blur-sm transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-900 text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Heart size={14} />
                      <span className="text-sm">{item.likes}</span>
                    </div>
                    
                    <button
                      onClick={() => handleViewProducts(item.products)}
                      className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                    >
                      View Products →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Eye size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No looks found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Lookbook;
