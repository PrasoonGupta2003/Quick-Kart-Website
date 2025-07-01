import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import {
  IoSearchCircleOutline,
  IoSearchCircleSharp
} from 'react-icons/io5';
import {
  FaUserCircle,
  FaHome,
  FaBoxOpen,
  FaInfoCircle,
  FaPhone
} from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { userDataContext } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { shopDataContext } from '../context/ShopContext';

function Nav() {
  const { userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { showSearch, setShowSearch, search, setSearch, cartCount } = useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSearch = () => {
    if (location.pathname !== '/collection') {
      navigate('/collection');
    }
    setShowSearch(true);
  };

  const logoutHandler = async () => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Logout'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.get(serverUrl + "/api/auth/logout", {
          withCredentials: true,
        });
        setUserData(null);
        setShowProfile(false);
        navigate('/login');
        Swal.fire('Logged Out', 'You have been successfully logged out.', 'success');
      } catch (err) {
        console.error("Logout failed", err);
        Swal.fire('Error', 'Logout failed. Please try again.', 'error');
      }
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="w-full h-[70px] bg-[#ecfafaec] fixed top-0 z-50 shadow-md flex items-center justify-between px-6 font-sans">
        {/* Logo */}
        <div className="flex items-center gap-3 w-[30%] cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="logo" className="w-9 h-9" />
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">QuickKart</h1>
        </div>

        {/* Center Links */}
        <ul className="hidden md:flex items-center gap-6 w-[40%] justify-center text-white text-sm">
          <li className="bg-black/80 px-5 py-2 rounded-xl cursor-pointer hover:bg-black" onClick={() => navigate('/')}>Home</li>
          <li className="bg-black/80 px-5 py-2 rounded-xl cursor-pointer hover:bg-black" onClick={() => navigate('/collection')}>Collections</li>
          <li className="bg-black/80 px-5 py-2 rounded-xl cursor-pointer hover:bg-black" onClick={() => navigate('/about')}>About</li>
          <li className="bg-black/80 px-5 py-2 rounded-xl cursor-pointer hover:bg-black" onClick={() => navigate('/contact')}>Contact</li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4 w-[30%] justify-end relative text-black">
          {/* Search Icon */}
          {(!showSearch || location.pathname !== '/collection') ? (
            <IoSearchCircleOutline
              className="cursor-pointer hover:scale-110 transition-transform duration-200 text-3xl"
              onClick={toggleSearch}
            />
          ) : (
            <IoSearchCircleSharp
              className="cursor-pointer hover:scale-110 transition-transform duration-200 text-3xl"
              onClick={() => setShowSearch(false)}
            />
          )}

          {/* User Icon */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => setShowProfile(prev => !prev)}
          >
            <FaUserCircle className="text-2xl" />
            {userData?.name && (
              <span className="hidden md:inline text-sm font-medium text-gray-700 capitalize"></span>
            )}
          </div>

          {/* Dropdown Menu */}
          {showProfile && (
            <ul className="absolute right-0 top-14 w-40 bg-white rounded-lg shadow-lg border border-gray-200 text-sm z-50 animate-fadeIn">
              {!userData ? (
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate('/login');
                    setShowProfile(false);
                  }}
                >
                  Login
                </li>
              ) : (
                <>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    navigate('/orders');
                    setShowProfile(false);
                  }}>Orders</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    navigate('/about');
                    setShowProfile(false);
                  }}>About</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    window.open('https://quick-kart-website-admin.onrender.com', '_blank');
                    setShowProfile(false);
                  }}>Admin Mode</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600" onClick={logoutHandler}>Logout</li>
                </>
              )}
            </ul>
          )}

          {/* Cart Icon */}
          <div className="relative cursor-pointer hover:scale-105 transition-transform duration-200" onClick={() => navigate('/cart')}>
            <MdOutlineShoppingCart className="text-2xl" />
            <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] px-1.5 py-[1px] rounded-full">
              {cartCount}
            </span>
          </div>
        </div>

        {/* Search Bar Below Navbar */}
        {showSearch && location.pathname === '/collection' && (
          <div className="w-full absolute top-[70px] left-0 bg-[#d8f6f9dd] px-4 py-3 shadow-md z-40 transition-all duration-300">
            <input
              type="text"
              placeholder="Search Here"
              className="w-full px-5 py-2 rounded-full bg-[#233533] text-white placeholder:text-white text-sm sm:text-base outline-none"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        )}
      </nav>

      {/* Bottom Nav for Mobile */}
      <div className="fixed bottom-0 left-0 w-full h-[60px] bg-white border-t shadow-inner flex justify-around items-center text-black z-40 md:hidden">
        <div className="flex flex-col items-center text-xs cursor-pointer" onClick={() => navigate('/')}>
          <FaHome className="text-xl mb-1" />
          <span>Home</span>
        </div>
        <div className="flex flex-col items-center text-xs cursor-pointer" onClick={() => navigate('/collection')}>
          <FaBoxOpen className="text-xl mb-1" />
          <span>Collections</span>
        </div>
        <div className="flex flex-col items-center text-xs cursor-pointer" onClick={() => navigate('/about')}>
          <FaInfoCircle className="text-xl mb-1" />
          <span>About</span>
        </div>
        <div className="flex flex-col items-center text-xs cursor-pointer" onClick={() => navigate('/contact')}>
          <FaPhone className="text-xl mb-1" />
          <span>Contact</span>
        </div>
      </div>
    </>
  );
}

export default Nav;
