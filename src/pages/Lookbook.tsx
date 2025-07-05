import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LazyImage from '../components/LazyImage';
import LoadingScreen from '../components/LoadingScreen';

const Lookbook = () => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  const lookbookItems = [
    {
      title: 'NEVER ENOUGH',
      image: '/lookbook/never1.jpg',
      description: 'Spring/Summer 2025 Never Enough Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'NEVER ENOUGH',
      image: '/lookbook/never2.jpg',
      description: 'Spring/Summer 2025 Never Enough Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'NEVER ENOUGH',
      image: '/lookbook/never3.jpg',
      description: 'Spring/Summer 2025 Never Enough Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'HUSTLE & FLOW',
      image: '/lookbook/new1.png',
      description: 'Spring/Summer 2025 Hustle & Flow Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'HUSTLE & FLOW',
      image: '/lookbook/new2.png',
      description: 'Spring/Summer 2025 Hustle & Flow Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'HUSTLE & FLOW',
      image: '/lookbook/new3.png',
      description: 'Spring/Summer 2025 Hustle & Flow Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'REMARKS 0.2',
      image: '/lookbook/model1.jpg',
      description: 'Spring/Summer 2025 REMARKS 0.2 Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'REMARKS 0.2',
      image: '/lookbook/model2.jpg',
      description: 'Spring/Summer 2025 REMARKS 0.2 Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'REMARKS 0.2',
      image: '/lookbook/model3.jpg',
      description: 'Spring/Summer 2025 REMARKS 0.2 Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'INVASION FROM THE EAST',
      image: '/lookbook/model4.jpg',
      description: 'Spring/Summer 2025 Invasion From The East Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'INVASION FROM THE EAST',
      image: '/lookbook/model5.jpg',
      description: 'Spring/Summer 2025 Invasion From The East Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'INVASION FROM THE EAST',
      image: '/lookbook/model6.jpg',
      description: 'Spring/Summer 2025 Invasion From The East Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'FIRST OF ALL',
      image: '/lookbook/model7.jpg',
      description: 'Spring/Summer 2025 FIRST OF ALL Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'FIRST OF ALL',
      image: '/lookbook/model8.jpg',
      description: 'Spring/Summer 2025 FIRST OF ALL Lookbook, Gorontalo, Indonesia 2025.',
    },
    {
      title: 'FIRST OF ALL',
      image: '/lookbook/model9.jpg',
      description: 'Spring/Summer 2025 FIRST OF ALL Lookbook, Gorontalo, Indonesia 2025.',
    },
  ];

  const handleViewProducts = (item: any) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedImages >= lookbookItems.length) {
      const timeout = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [loadedImages, lookbookItems.length]);

  useEffect(() => {
    const maxTimeout = setTimeout(() => setLoading(false), 7000);
    return () => clearTimeout(maxTimeout);
  }, []);

  return (
    <>
      {loading && <LoadingScreen transparent />}
      <div className="flex flex-col min-h-screen bg-white">
        <Header />

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-4xl font-semibold text-gray-900 mb-4">LOOKBOOK</h1>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {lookbookItems.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    onLoad={handleImageLoad}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleViewProducts(item)}
                      className="p-1.5 rounded-full bg-white/80 text-gray-700 hover:bg-white backdrop-blur-sm transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />

        {selectedItem && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 px-4"
            onClick={closeModal}
          >
            <div
              className="max-w-2xl w-full mx-auto flex flex-col items-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <LazyImage
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full max-h-[80vh] object-contain rounded-md mb-4"
              />
              <h2 className="text-white text-2xl font-semibold mb-2">{selectedItem.title}</h2>
              <p className="text-gray-300 mb-6 text-sm px-4 md:px-6">{selectedItem.description}</p>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Lookbook;
