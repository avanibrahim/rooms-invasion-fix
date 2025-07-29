import React from "react";
import { FiMenu } from "react-icons/fi";

const Topbar = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="flex items-center justify-between px-4 py-3 bg-white shadow md:hidden sticky top-0 z-20">
    <button onClick={onMenuClick} className="text-2xl text-blue-700">
      <FiMenu />
    </button>
    <span className="font-bold text-blue-800 text-lg">Admin Dashboard</span>
    <span className="w-6" />
  </header>
);

export default Topbar;
