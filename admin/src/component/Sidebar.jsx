import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaListUl } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-[18%] min-h-[calc(100vh-70px)] border-r border-gray-700 bg-[#141414] py-10 fixed left-0 top-[70px] text-white text-[15px] shadow-md z-10">
      <div className="flex flex-col gap-4 items-center">
        
        {/* Add Items */}
        <div
          onClick={() => navigate('/add')}
          className="w-[90%] flex items-center gap-3 cursor-pointer border border-gray-800 px-4 py-3 rounded-md hover:bg-[#2c7b89] transition-all duration-200"
        >
          <IoIosAddCircleOutline className="w-[20px] h-[20px]" />
          <p className="hidden md:block">Add Items</p>
        </div>

        {/* Lists */}
        <div
          onClick={() => navigate('/lists')}
          className="w-[90%] flex items-center gap-3 cursor-pointer border border-gray-800 px-4 py-3 rounded-md hover:bg-[#2c7b89] transition-all duration-200"
        >
          <FaListUl className="w-[20px] h-[20px]" />
          <p className="hidden md:block">List Items</p>
        </div>

        {/* View Orders */}
        <div
          onClick={() => navigate('/orders')}
          className="w-[90%] flex items-center gap-3 cursor-pointer border border-gray-800 px-4 py-3 rounded-md hover:bg-[#2c7b89] transition-all duration-200"
        >
          <MdOutlineShoppingCart className="w-[20px] h-[20px]" />
          <p className="hidden md:block">View Orders</p>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
