import React, { useContext, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaMapMarkerAlt, FaMoneyBillAlt, FaTruck,
  FaShoppingBag, FaCalendarAlt
} from 'react-icons/fa';
import { authDataContext } from '../context/authContext';
import Swal from 'sweetalert2';

function PlaceOrder() {
  const { cartItem, getCartAmount, currency, products } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', mobile: '', pincode: '',
    city: '', state: '', street: '',
    landmark: '', altPhone: ''
  });

  const [error, setError] = useState('');
  const amount = getCartAmount();
  const estimatedDate = new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', {
    weekday: 'short', month: 'short', day: 'numeric'
  });

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isAddressValid = () => Object.values(address).every(field => field.trim() !== '');

  const getItemsList = () => {
    let items = [];
    for (let itemId in cartItem) {
      const product = products.find(p => p._id === itemId);
      if (product) {
        for (let size in cartItem[itemId]) {
          items.push({
            itemId,
            size,
            quantity: cartItem[itemId][size],
            name: product.name,
            price: product.price,
          });
        }
      }
    }
    return items;
  };

  const placeCODOrder = async () => {
  const { mobile, altPhone } = address;

  // Basic validation
  if (!isAddressValid()) {
    setError('⚠️ Please fill all address fields.');
    return;
  }

  // Check phone numbers
  if (!/^\d{10}$/.test(mobile) || !/^\d{10}$/.test(altPhone)) {
    return Swal.fire({
      icon: 'warning',
      title: 'Invalid Mobile Number',
      text: 'Both Mobile and Alternate Phone must be exactly 10 digits.',
    });
  }

  if (mobile === altPhone) {
    return Swal.fire({
      icon: 'warning',
      title: 'Phone Number Conflict',
      text: 'Mobile and Alternate Phone must be different.',
    });
  }

  // Confirm order
  const result = await Swal.fire({
    icon: 'question',
    title: 'Place Order?',
    text: 'Confirm placing this order with Cash on Delivery?',
    showCancelButton: true,
    confirmButtonText: 'Yes, place it!',
  });

  if (!result.isConfirmed) return;

  try {
    const res = await axios.post(serverUrl + '/api/order/placeorder', {
      items: getItemsList(),
      amount,
      address,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now(),
    }, { withCredentials: true });

    Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      text: '🎉 Your order has been placed successfully.',
      confirmButtonText: 'OK',
    });

    navigate('/orders');
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Order Failed',
      text: '❌ Something went wrong while placing the order.',
    });
  }
};

  return (
    <div className="min-h-screen pt-[100px] pb-16 bg-[#f3f7f7] px-4 lg:px-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📦 Confirm Your Order</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE: Address + Cart Items */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Address Form */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt /> Delivery Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(address).map(([field, value]) => (
                <input
                  key={field}
                  name={field}
                  value={value}
                  onChange={handleInputChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring w-full"
                />
              ))}
            </div>
          </div>

          {/* Order Item Preview */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
              <FaShoppingBag /> Items in Your Order
            </h3>
            <ul className="space-y-4">
              {getItemsList().map((item, index) => (
                <li key={index} className="flex justify-between border-b pb-2 text-gray-700">
                  <div>
                    <span className="font-medium">{item.name}</span> ({item.size}) x {item.quantity}
                  </div>
                  <div>₹{item.price * item.quantity}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE: Summary & Payment */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full lg:w-1/3 h-fit">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
            <FaTruck /> Order Summary
          </h3>

          <div className="text-lg font-bold mb-2 text-gray-800">
            Total: {currency}{amount}
          </div>

          <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
            <FaCalendarAlt className="text-base" />
            <span>Estimated Delivery: <strong>{estimatedDate}</strong></span>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            ✅ Free delivery on COD orders. Fast, safe and contactless.
          </p>

          <button
            onClick={placeCODOrder}
            className="w-full bg-[#203030] hover:bg-[#182525] text-white py-3 px-4 rounded-md font-semibold flex items-center justify-center gap-2"
          >
            <FaMoneyBillAlt className="text-xl" /> Cash on Delivery
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
