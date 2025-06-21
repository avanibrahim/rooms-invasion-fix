import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const Hero = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const navigate = useNavigate();

  // Array of hero images
  const heroImages = [
    'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/model/b1.png)',
    'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/model/b2.png)',
    'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/model/b3.png)',
  ];
  // Auto-scroll functionality
  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  const handleShopNowClick = () => {
    console.log('Shop Now button clicked');
    navigate('/shop');
  };

  const handleViewLookbookClick = () => {
    console.log('View Lookbook button clicked');
    navigate('/Lookbook');
  };

  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-600 text-white">
      <Carousel
        setApi={setApi}
        className="relative min-h-[60vh]"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className="relative min-h-[80vh] sm:min-h-[80vh] md:min-h-[91vh] flex items-end pb-6 sm:pb-20 md:pb-24 lg:pb-32 bg-cover bg-center"
                style={{
                  backgroundImage: image
                }}
              >
                {/* Background overlay with lower z-index */}
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                
                {/* Content container with higher z-index - positioned lower */}
                <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-30 w-full">
                  <div className="max-w-xl sm:max-w-2xl">
                    {/* Responsive heading */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 sm:mb-6 leading-tight">
                      New Fashion
                      <span className="block text-1xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-300 mt-1">
                        Collection 2024
                      </span>
                    </h1>
                    
                    {/* Responsive paragraph */}
                    <p className="text-base sm:text-lg md:text-xl mb-1 sm:mb-8 text-gray-200 leading-relaxed">
                      Discover the latest trends in fashion. From casual wear to formal attire,
                      find your perfect style with our curated collection.
                    </p>
                    
                    {/* Responsive buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button
                        onClick={handleShopNowClick}
                        className="
                          bg-white text-gray-900 
                          px-6 py-3 sm:px-7 sm:py-3 md:px-8 md:py-4 
                          text-sm sm:text-base md:text-lg
                          rounded-lg font-semibold 
                          hover:bg-gray-100 active:bg-gray-200
                          transition-all duration-200 
                          flex items-center justify-center 
                          group cursor-pointer
                          min-h-[28px] sm:min-h-[52px]
                          touch-manipulation
                          transform hover:scale-105 active:scale-95
                          shadow-lg hover:shadow-xl
                          relative z-40
                          focus:outline-none focus:ring-4 focus:ring-white/50
                        "
                      >
                        Shop Now
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={18} />
                      </button>
                      
                      <button
                        onClick={handleViewLookbookClick}
                        className="
                          border-2 border-white text-white 
                          px-6 py-3 sm:px-7 sm:py-3 md:px-8 md:py-4 
                          text-sm sm:text-base md:text-lg
                          rounded-lg font-semibold 
                          hover:bg-white hover:text-gray-900 
                          active:bg-gray-100 active:text-gray-900
                          transition-all duration-200 
                          cursor-pointer
                          min-h-[48px] sm:min-h-[52px]
                          touch-manipulation
                          transform hover:scale-105 active:scale-95
                          shadow-lg hover:shadow-xl
                          relative z-40
                          focus:outline-none focus:ring-4 focus:ring-white/50
                        "
                      >
                        View Lookbook
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows with proper z-index */}
        <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 border-white/30 text-white hover:bg-white/30 w-2 h-2 sm:w-8 sm:h-8" />
        <CarouselNext className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 border-white/30 text-white hover:bg-white/30 w-2 h-2 sm:w-8 sm:h-8" />
      </Carousel>
    </section>
  );
};
export default Hero;
