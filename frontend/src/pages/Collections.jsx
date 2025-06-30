import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(shopDataContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter(item => subCategory.includes(item.subCategory));
    }

    switch (sortType) {
      case 'low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProduct(filtered);
  };

  useEffect(() => {
    getFilteredAndSortedProducts();
  }, [products, category, subCategory, search, showSearch, sortType]);

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row justify-start pt-[70px] overflow-hidden z-[2] pb-[100px]'>

      {/* Filter Sidebar */}
      <div className={`${showFilter ? "h-[45vh]" : "h-[8vh]"} md:w-[30vw] lg:w-[20vw] md:min-h-[100vh] p-[20px] border-r border-gray-400 text-[#aaf5fa] lg:fixed bg-[#1a1a1a] rounded-r-xl shadow-lg`}>        
        <p
          className='text-[25px] font-semibold flex gap-[10px] items-center justify-between cursor-pointer md:cursor-default'
          onClick={() => setShowFilter(prev => !prev)}
        >
          FILTERS
          <span className='md:hidden'>
            {showFilter ? <IoIosArrowDown size={20} /> : <IoIosArrowForward size={20} />}
          </span>
        </p>

        {/* Categories Section */}
        <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='text-[18px] text-[#f8fafa]'>CATEGORIES</p>
          <div className='flex flex-col gap-[10px] mt-2'>
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className='flex items-center gap-2 text-[16px] font-light'>
                <input type='checkbox' value={cat} className='w-4 h-4 accent-blue-500' onChange={toggleCategory} /> {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Sub-Categories Section */}
        <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='text-[18px] text-[#f8fafa]'>SUB-CATEGORIES</p>
          <div className='flex flex-col gap-[10px] mt-2'>
            {["TopWear", "BottomWear", "WinterWear"].map((sub) => (
              <label key={sub} className='flex items-center gap-2 text-[16px] font-light'>
                <input type='checkbox' value={sub} className='w-4 h-4 accent-green-400' onChange={toggleSubCategory} /> {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className='lg:pl-[20%] md:py-[10px] w-full'>
        <div className='w-full p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px]'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            className='bg-slate-700 w-full md:w-[200px] h-[50px] px-[10px] text-white rounded-lg hover:border-[#46d1f7] border-2 mt-4 md:mt-0'
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        <div className='w-full min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px] px-6'>
          {filterProduct.length > 0 ? (
            filterProduct.map((item, index) => (
              <Card
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1}
              />
            ))
          ) : (
            <p className="text-white text-lg">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collections;
