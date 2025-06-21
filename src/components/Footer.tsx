
import React from 'react';

const Footer = () => {
  return (
        <footer className="bg-black text-white mt- pt-8 py-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Rooms Invasion - All rights reserved.
          </p>
        </footer>
  );
};

export default Footer;
