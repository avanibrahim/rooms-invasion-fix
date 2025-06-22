import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-8 py-8 text-center">
      <p className="text-gray-500">
        &copy; {new Date().getFullYear()}{' '}
        <a
          href="https://instagram.com/rooms_invasion"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray hover:text-white font-semibold transition-colors"
        >
          Rooms Invasion
        </a>{' '}
        - All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;