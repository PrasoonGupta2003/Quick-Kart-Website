import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import logo from "../assets/logo.png";

import {
  FaTachometerAlt,
  FaPlusCircle,
  FaList,
  FaBoxOpen,
  FaSignOutAlt,
} from 'react-icons/fa';

function Nav() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);

  const logOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      getAdmin(); // Clear admin state
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
    { name: 'Add Product', icon: <FaPlusCircle />, path: '/add' },
    { name: 'Product List', icon: <FaList />, path: '/lists' },
    { name: 'Orders', icon: <FaBoxOpen />, path: '/orders' },
  ];

  return (
    <div className="w-full h-[70px] fixed top-0 z-50 bg-[#0e1f28]/80 backdrop-blur-sm shadow-md flex items-center justify-between px-4 md:px-10 border-b border-gray-700">
      {/* Logo Section */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="QuickKart Logo" className="w-[38px] h-[38px] rounded-full shadow" />
        <h1 className="text-xl md:text-2xl font-bold text-[#d4f3ff] drop-shadow-sm tracking-wide">
          QuickKart Admin
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-4 lg:gap-6">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1c3c4a] hover:bg-[#2f6b82] text-white border border-[#3a6b7e] rounded-lg shadow-sm transition duration-200 hover:scale-[1.03]"
          >
            {item.icon}
            <span className="hidden sm:inline">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={logOut}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white border border-red-700 rounded-lg shadow-sm transition duration-200"
      >
        <FaSignOutAlt />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}

export default Nav;
