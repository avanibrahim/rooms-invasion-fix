import React, { useState } from 'react';
import { Heart, Eye } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Lookbook = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Sample lookbook data - ganti dengan data sebenarnya
  const lookbookItems = [
    {
        title: 'ETERNAL TEE - WHITE',
        category: 'casual',
        image: '/lookbook/new1.png',
        description: 'Perfect casual look for summer days',
        likes: 48,
    },
    {
        title: 'STILL TEE - BLACK',
        category: 'casual',
        image: '/lookbook/new2.png',
        description: 'Perfect casual look for summer days',
        likes: 52,
    },
    {
        title: 'LOVE MOM TEE - BLACK',
        category: 'casual',
        image: '/lookbook/new3.png',
        description: 'Perfect casual look for summer days',
        likes: 50,
    },
    {
      id: '1',
      title: 'PRODUCT NAME',
      category: 'casual',
      image: '/lookbook/model1.jpg',
      description: 'Perfect casual look for summer days',
       // Product IDs yang digunakan
      likes: 45,
    },
    {
      id: '2',
      title: 'PRODUCT NAME',
      category: 'casual',
      image: '/lookbook/model2.jpg',
      description: 'Professional look for the workplace',
      products: ['3', '4'],
      likes: 32,
    },
    {
      id: '3',
      title: 'PRODUCT NAME',
      category: 'street',
      image: '/lookbook/model3.jpg',
      description: 'Urban street style inspiration',
      products: ['5', '6'],
      likes: 67,
    },
    
    {
      id: '4',
      title: 'PRODUCT NAME',
      category: 'casual',
      image: '/lookbook/model4.jpg',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      products: ['7', '8'],
      likes: 23,
    },
    {
      id: '5',
      title: 'PRODUCT NAME',
      category: 'street',
      image: '/lookbook/model5.jpg',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      products: ['9', '10'],
      likes: 23,
    },
    {
      id: '6',
      title: 'GROWS CREWNECK - BLACK',
      category: 'street',
      image: '/lookbook/model6.jpg',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      products: ['11', '12'],
      likes: 23,
    },
    {
      id: '7',
      title: 'PRODUCT NAME',
      category: 'street',
      image: '/lookbook/model7.jpg',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      products: ['13', '14'],
      likes: 23,
    },
    {
      id: '8',
      title: 'PRODUCT NAME',
      category: 'street',
      image: '/lookbook/model8.jpg',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      products: ['15', '16'],
      likes: 23,
    },
    {
      id: '9',
      title: 'T-SHIRT - GREEN',
      category: 'casual',
      image: '/lookbook/model9.jpg',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      products: ['17', '18'],
      likes: 23,
    },
    // Tambahkan lebih banyak items sesuai kebutuhan
  ];

  const categories = ['all', 'casual', 'formal', 'street'];

  const filteredItems =
    selectedCategory === 'all'
      ? lookbookItems
      : lookbookItems.filter((item) => item.category.includes(selectedCategory));

  const handleLike = (itemId: string) => {
    setLikedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleViewProducts = (item: any) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* MAIN: grows to fill remaining vertical space */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lookbook</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get inspired by our curated style collections. Discover how to mix and match our pieces to create the perfect look for any occasion.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category === 'all'
                  ? 'All Styles'
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-600">
            {filteredItems.length} {filteredItems.length === 1 ? 'look' : 'looks'} found
          </p>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

                  <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`p-1.5 rounded-full backdrop-blur-sm transition-colors ${
                        likedItems.includes(item.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/80 text-gray-700 hover:bg-white'
                      }`}
                    >
                      <Heart
                        size={16}
                        fill={likedItems.includes(item.id) ? 'currentColor' : 'none'}
                      />
                    </button>

                    <button
                      onClick={() => handleViewProducts(item)}
                      className="p-1.5 rounded-full bg-white/80 text-gray-700 hover:bg-white backdrop-blur-sm transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </div>

                  <div className="absolute top-2 left-2">
                    <span className="bg-white/90 text-gray-900 text-[10px] px-2 py-0.5 rounded-full font-medium backdrop-blur-sm">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
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

      {/* MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 px-4"
          onClick={closeModal}
        >
          <div
            className="max-w-2xl w-full mx-auto flex flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-full max-h-[80vh] object-contain rounded-md mb-4"
            />
            <h2 className="text-white text-2xl font-semibold mb-2">{selectedItem.title}</h2>
            <p className="text-gray-300 mb-6 text-sm px-4 md:px-6">{selectedItem.description}</p>
            <button
              onClick={closeModal}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lookbook;
