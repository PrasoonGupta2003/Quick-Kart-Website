import React from 'react';
import { FaShippingFast, FaRedoAlt, FaLock, FaHeadset } from 'react-icons/fa';
import about1 from '../assets/about1.jpg';
import about2 from '../assets/about2.jpg';
import about3 from '../assets/about3.jpg';

function AboutUs() {
  return (
    <div className="w-full px-6 md:px-16 bg-[#f1f5f9] text-gray-800 py-[100px]">

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">About QuickKart</h1>
        <p className="text-lg text-gray-600">Wear Confidence. Wear QuickKart.</p>
      </div>

      {/* Motto Section with image */}
      <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 text-md leading-relaxed">
            QuickKart was born from a simple idea — to make fashion accessible, fast, and dependable. We are more than just a brand;
            we're a movement that empowers people to dress confidently without compromising on quality or convenience.
          </p>
          <p className="text-gray-700 text-md leading-relaxed mt-4">
            Our focus remains on delivering an unmatched shopping experience. From handpicking the trendiest products to ensuring
            fast, secure deliveries, we aim to bring a smile to your face every time you unbox a QuickKart product.
          </p>
        </div>
        <img src={about1} alt="About QuickKart" className="w-full h-80 object-cover rounded-lg shadow" />
      </div>

      {/* Why Choose Us */}
      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">

          <div className="flex flex-col items-center">
            <FaShippingFast className="text-blue-500 text-4xl mb-3" />
            <h3 className="font-bold text-lg mb-1">Fast Delivery</h3>
            <p className="text-sm text-gray-600">
              We understand time matters. That’s why we ensure swift delivery right at your doorstep — with care and precision.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <FaRedoAlt className="text-green-500 text-4xl mb-3" />
            <h3 className="font-bold text-lg mb-1">Easy Exchange</h3>
            <p className="text-sm text-gray-600">
              Change your mind? No worries. Our exchange process is smooth, hassle-free, and completely customer-focused.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <FaLock className="text-purple-500 text-4xl mb-3" />
            <h3 className="font-bold text-lg mb-1">Secure Payments</h3>
            <p className="text-sm text-gray-600">
              Shop with confidence — all transactions are encrypted and handled by trusted payment partners.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <FaHeadset className="text-pink-500 text-4xl mb-3" />
            <h3 className="font-bold text-lg mb-1">24/7 Support</h3>
            <p className="text-sm text-gray-600">
              We're always here. Our dedicated support team is available round the clock to assist you with anything.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section with image */}
      <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img src={about2} alt="Our Story" className="w-full h-80 object-cover rounded-lg shadow" />
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-md text-gray-700 leading-relaxed">
            Started by a team of passionate creators and entrepreneurs, QuickKart began as a vision to redefine how people shop for fashion online.
            What started with a few designs is now a thriving platform with a wide array of products that cater to every mood, every moment.
          </p>
          <p className="text-md text-gray-700 leading-relaxed mt-4">
            Our story is one of relentless innovation and unwavering customer focus. Every feature we build, every product we ship,
            and every decision we make has one goal — to delight our customers and empower them through style.
          </p>
        </div>
      </div>

      {/* Image with supporting text */}
      <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">A Look Behind the Scenes</h2>
          <p className="text-md text-gray-700 leading-relaxed">
            Every product we offer goes through a careful process — from concept to delivery. We focus on quality, comfort, and a customer-first experience.
          </p>
          <p className="text-md text-gray-700 leading-relaxed mt-4">
            Our warehouse and logistics partners help us bring QuickKart to life every day, powering seamless orders and faster deliveries.
          </p>
        </div>
        <img src={about3} alt="QuickKart Behind the Scenes" className="w-full h-80 object-cover rounded-lg shadow" />
      </div>

      {/* Call to Action */}
      <div className="text-center mt-10 bg-blue-50 p-10 rounded-xl shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Join the QuickKart Movement</h3>
        <p className="max-w-xl mx-auto text-gray-600 mb-6">
          Explore a curated collection that’s fresh, fashionable, and delivered with care. Thousands of happy customers 
          trust QuickKart — and so can you.
        </p>
        <a href="/collection">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Explore Collection
          </button>
        </a>
      </div>
    </div>
    
  );
}

export default AboutUs;
