import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { MdLocalShipping, MdVerified, MdReplay } from 'react-icons/md';

function CartTotal() {
  const { getCartAmount, delivery_fee, currency } = useContext(shopDataContext);
  const navigate = useNavigate();
  const amount = getCartAmount();
  const isFreeDelivery = amount > 1000;
  const finalTotal = amount + (isFreeDelivery ? 0 : delivery_fee);

  if (amount === 0) return null; // Hide component if cart is empty

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 mt-8 text-gray-800 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🧾 Order Summary</h2>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total Product Amount</span>
          <span className="font-semibold text-lg">{currency}{amount}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Delivery Charges</span>
          {isFreeDelivery ? (
            <span>
              <span className="line-through text-gray-500 mr-2">{currency}{delivery_fee}</span>
              <span className="text-green-600 font-semibold">Free</span>
            </span>
          ) : (
            <span className="font-semibold text-lg">{currency}{delivery_fee}</span>
          )}
        </div>

        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <span className="text-lg font-bold">Final Total</span>
          <span className="text-lg font-bold">{currency}{finalTotal}</span>
        </div>
      </div>

      <button
        onClick={() => navigate('/placeorder')}
        className="w-full mt-6 bg-[#203030] hover:bg-[#182525] text-white py-3 px-4 rounded-full text-lg font-semibold transition duration-200"
      >
        Proceed to Checkout
      </button>

      {/* Tempting Taglines Section */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <MdLocalShipping className="text-xl text-green-600" />
          <span><strong>2-Day Delivery</strong> across India</span>
        </div>
        <div className="flex items-center gap-2">
          <MdVerified className="text-xl text-blue-600" />
          <span><strong>Free Delivery</strong> on orders above ₹1000</span>
        </div>
        <div className="flex items-center gap-2">
          <MdReplay className="text-xl text-yellow-500" />
          <span><strong>7-Day Return</strong> Guarantee</span>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
