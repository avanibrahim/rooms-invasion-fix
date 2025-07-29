import React from "react";
import { FiHome, FiBox, FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: <FiHome />, path: "/admin" },
  { name: "Products", icon: <FiBox />, path: "/admin/products" },
  { name: "Users", icon: <FiUsers />, path: "/admin/users" },
];

const Sidebar = ({ show, setShow }: { show: boolean; setShow: (b: boolean) => void }) => (
  <aside className={`
    fixed z-30 top-0 left-0 h-full w-60 bg-gradient-to-b from-blue-800 to-blue-600 text-white shadow-lg
    transform transition-transform duration-200
    ${show ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static md:shadow-none
  `}>
    <div className="flex items-center justify-between px-5 py-4 border-b border-blue-700">
      <span className="font-bold text-lg tracking-widest">Admin Panel</span>
      <button className="md:hidden" onClick={() => setShow(false)}>
        &times;
      </button>
    </div>
    <nav className="mt-6 flex flex-col gap-2 px-4">
      {menu.map(item => (
        <NavLink
          to={item.path}
          key={item.name}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition hover:bg-blue-700/70 ${isActive ? "bg-blue-700" : ""}`
          }
          onClick={() => setShow(false)}
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
