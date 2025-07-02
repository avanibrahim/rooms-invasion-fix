import React, { useState, useEffect } from 'react';
import { Users, Target, Heart, Award, Globe, Truck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const About = () => {
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedImages >= 1) {
      const timeout = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [loadedImages]);

  useEffect(() => {
    const maxTimeout = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(maxTimeout);
  }, []);

  return (
    <>
      {loading && <LoadingScreen transparent />}
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="bg-gray-50 py-6">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-4xl font-semibold text-gray-900 mb-8">About Us</h1>
                <img
                  src="/image/room.jpeg"
                  alt="StyleShop Store"
                  onLoad={handleImageLoad}
                  className="max-w-2xl mx-auto mb-8 w-full h-25 object-cover md:h-96 rounded-lg shadow-lg md:shadow-xl"
                />
                <div className="max-w-2xl mx-auto text-left">
                  <div className="max-h-64 overflow-y-auto pr-2 bg-gray-100 p-4 rounded-md shadow-inner">
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Rooms Invasion is a streetwear clothing brand founded in 2024 in Gorontalo, a small city in Indonesia filled with big hopes. Born from a deep passion for simplicity and authenticity, Rooms Invasion embraces a minimalist design concept—clean, thoughtful, and timeless.
                    </p>
                    <p className="text-xl text-gray-600 leading-relaxed mt-4">
                      We believe that less is more. In a world that often feels overwhelming, we offer a space—a “room”—for calm, clarity, and self-expression. Every piece we create is designed to be simple yet bold, quiet yet confident. It’s not just clothing; it’s a statement of being present and intentional.
                    </p>
                    <p className="text-xl text-gray-600 leading-relaxed mt-4">
                      Our mission is to redefine streetwear through minimalism, offering essentials that speak louder through subtlety. Rooms Invasion stands for those who find strength in simplicity and want to express individuality without excess.
                    </p>
                    <p className="text-xl text-gray-600 leading-relaxed mt-4">
                      From the heart of Gorontalo to the streets of the world, we are here to invade your everyday style with purpose and precision.
                    </p>
                  </div>

                  <p className="text-lg text-gray-800 font-semibold mt-4">
                    Rooms Invasion — Your room, your rhythm.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
