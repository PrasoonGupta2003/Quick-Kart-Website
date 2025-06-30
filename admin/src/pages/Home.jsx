import React from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import AdminDashboard from '../component/AdminDashboard';

function Home() {
  return (
    <div className='w-full h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col'>
      {/* Top Navbar */}
      <div className='w-full h-[60px] z-50'>
        <Nav />
      </div>

      {/* Sidebar and Dashboard layout */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Sidebar */}
        <div className='hidden md:block w-[220px] bg-[#0c2025] border-r border-gray-700'>
          <Sidebar />
        </div>

        {/* Dashboard Content */}
        <div className='flex-1 overflow-y-auto md:p-8 ml-[5%]'>
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
}

export default Home;
