import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHome,
  FaInfoCircle,
  FaShoppingCart,
  FaThLarge
} from 'react-icons/fa';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="w-full bg-[#0f172a] text-white px-6 md:px-16 py-8 mt-1 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Logo & About */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="QuickKart Logo" className="h-10" />
            <h1 className="text-2xl md:text-3xl font-bold text-[#60a5fa]">QuickKart</h1>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Discover quality, speed, and service — all in one place with QuickKart.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-300"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Navigation Links - Horizontal Line */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4 text-[#93c5fd]">Quick Links</h2>
          <ul className="flex flex-wrap gap-6 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <FaHome className="text-[#60a5fa]" />
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaThLarge className="text-[#60a5fa]" />
              <Link to="/collection" className="hover:text-white">Collection</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaInfoCircle className="text-[#60a5fa]" />
              <Link to="/about" className="hover:text-white">About</Link>
            </li>
            <li className="flex items-center gap-2">
              <FaShoppingCart className="text-[#60a5fa]" />
              <Link to="/cart" className="hover:text-white">Cart</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} QuickKart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
