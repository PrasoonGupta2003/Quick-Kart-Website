import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import axios from 'axios';
import { FaTruck, FaCheckCircle, FaRupeeSign, FaTimesCircle } from 'react-icons/fa';
import { authDataContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

function Orders() {
  const { currency, products } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.post(`${serverUrl}/api/order/userorder`, {}, { withCredentials: true });
        const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sorted);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [serverUrl]);

  const cancelOrder = async (orderId) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    });

    if (confirmed.isConfirmed) {
      try {
        await axios.post(`${serverUrl}/api/order/status`, { orderId, status: 'Cancelled' }, { withCredentials: true });
        Swal.fire('Cancelled!', 'Your order has been cancelled.', 'success');
        const updated = await axios.post(`${serverUrl}/api/order/userorder`, {}, { withCredentials: true });
        const sorted = (updated.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sorted);
      } catch (err) {
        console.error('Cancel failed', err);
        Swal.fire('Failed', 'Could not cancel the order.', 'error');
      }
    }
  };

  if (loading) {
    return <p className="text-center my-20 text-gray-600">Loading your orders...</p>;
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 bg-[#f3f7f7]">
        <p className="text-xl text-gray-600">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 lg:px-16 bg-[#f3f7f7]">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">🧾 Your Orders</h2>

      <div className="space-y-10">
        {orders.map((order) => {
          const estDelivery = new Date(order.createdAt).getTime() + 4 * 24 * 60 * 60 * 1000;
          const estDateStr = new Date(estDelivery).toLocaleDateString('en-IN', {
            weekday: 'short', month: 'short', day: 'numeric'
          });

          const updatedStr = new Date(order.updatedAt).toLocaleDateString('en-IN', {
            weekday: 'short', month: 'short', day: 'numeric'
          });

          const isDelivered = order.status?.toLowerCase() === 'delivered';
          const isCancelled = order.status?.toLowerCase() === 'cancelled';

          return (
            <div
              key={order._id}
              className={`rounded-xl shadow-lg p-6 space-y-4 ${
                isDelivered
                  ? 'bg-green-50 border-l-4 border-green-500'
                  : isCancelled
                  ? 'bg-red-50 border-l-4 border-red-500'
                  : 'bg-white border-l-4 border-yellow-500'
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="font-medium text-gray-700">
                  Order Placed: {new Date(order.createdAt).toLocaleDateString('en-IN')}
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    isDelivered
                      ? 'bg-green-100 text-green-800'
                      : isCancelled
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {order.status || 'Processing'}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 border-t pt-4">
                {order.items.map((item, i) => {
                  const product = products.find(p => p._id === item.itemId);
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <img
                        src={product?.image1 || '/placeholder.png'}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          Size: <strong>{item.size}</strong> • Qty: <strong>{item.quantity}</strong>
                        </p>
                      </div>
                      <div className="text-gray-800 font-semibold text-lg">
                        {currency}{item.price * item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary & Delivery */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                  <FaTruck className="text-lg" />
                  {!isDelivered ? (
                    <span>Estimated delivery: {estDateStr}</span>
                  ) : (
                    <>
                      <span className="line-through">Est: {estDateStr}</span>
                      <span className="text-green-800 font-semibold">Delivered on: {updatedStr}</span>
                    </>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <FaRupeeSign />
                  <span className="font-semibold">
                    {currency}
                    {order.amount < 1000 ? order.amount + 40 : order.amount}
                  </span>
                </div>
                <span className="text-gray-500">
                  (Includes {order.amount < 1000 ? `₹${delivery_fee} Delivery Fee` : 'Free Delivery'}) via {order.paymentMethod}
                </span>
              </div>
              </div>

              {/* Delivered Snapshot */}
              {isDelivered && (
                <div className="flex items-center gap-2 text-green-700 text-sm mt-2">
                  <FaCheckCircle />
                  <span>Delivered! Hope you're enjoying it 😊</span>
                </div>
              )}

              {/* Cancelled Snapshot */}
              {isCancelled && (
                <div className="flex items-center gap-2 text-red-700 text-sm mt-2">
                  <FaTimesCircle />
                  <span>Your order was cancelled.</span>
                </div>
              )}

              {/* Cancel Button */}
              {!isDelivered && !isCancelled && (
                <div className="text-right">
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="mt-4 inline-block px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
