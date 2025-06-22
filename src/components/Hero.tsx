import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const heroImages = [
    'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/model/b1.png)',
    'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/model/b2.png)',
    'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/model/b3.png)',
  ];

  const nextSlide = () => setCurrent((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleShopNowClick = () => navigate('/shop');
  const handleViewLookbookClick = () => navigate('/Lookbook');

  return (
    <section className="relative h-[80vh] sm:h-[85vh] md:h-[91vh] overflow-hidden text-white">
      {/* Images with fade transition */}
      {heroImages.map((img, i) => (
        <div
          key={i}
          className={`
            absolute inset-0 w-full h-full 
            bg-cover bg-center bg-no-repeat 
            transition-opacity duration-1000 ease-in-out
            ${current === i ? 'opacity-100 z-10' : 'opacity-0 z-0'}
          `}
          style={{ backgroundImage: img }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-20" />

      {/* Content */}
      <div className="relative z-30 h-full flex items-end pb-10 px-4 sm:px-12">
        <div className="max-w-xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Rooms Invasion
            <span className="block text-base sm:text-2xl text-gray-300 mt-1">
              Local Brand 2025
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-gray-200 mb-6">
            Discover the latest trends. From casual wear to formal attire, find your perfect style now.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleShopNowClick}
              className="bg-white text-gray-900 px-6 py-3 text-sm rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center group"
            >
              Shop Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={18} />
            </button>
            <button
              onClick={handleViewLookbookClick}
              className="border-2 border-white text-white px-6 py-3 text-sm rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              View Lookbook
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-5 h-5 sm:w-11 sm:h-11 rounded-full bg-white/20 text-white hover:bg-white/30 transition flex items-center justify-center"
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-5 h-5 sm:w-11 sm:h-11 rounded-full bg-white/20 text-white hover:bg-white/30 transition flex items-center justify-center"
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
};

export default Hero;
