
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';

import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
      </main>
        <Footer />
    </div>
  );
};

export default Index;
