import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaUser, FaTruck, FaCalendarAlt, FaCheckCircle,FaTimesCircle } from 'react-icons/fa';
import { authDataContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../component/Nav';

function Orders() {
  const { serverUrl } = useContext(authDataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(`${serverUrl}/api/order/list`, {}, {
        withCredentials: true
      });
      const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sorted);
    } catch (err) {
      console.error('Admin order fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.post(`${serverUrl}/api/order/status`, { orderId, status }, {
        withCredentials: true
      });
      toast.success(`Order marked as ${status}`);
      fetchOrders();
    } catch (err) {
      console.error('Status update failed', err);
      toast.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center py-20 text-gray-600">Loading orders...</p>;

  return (
    <>
    <Nav/>
    <div className="min-h-screen py-20 px-4 lg:px-16 bg-[#f3f7f7]">

      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-3xl font-bold mb-8 text-gray-800">📦 All Orders</h2>

      <div className="space-y-10">
        {orders.map((order) => {
          const estDelivery = new Date(order.createdAt).getTime() + 3 * 24 * 60 * 60 * 1000;
          const estStr = new Date(estDelivery).toLocaleDateString('en-IN', {
            weekday: 'short', month: 'short', day: 'numeric'
          });

          const updatedStr = new Date(order.updatedAt).toLocaleDateString('en-IN', {
            weekday: 'short', month: 'short', day: 'numeric'
          });

          const isDelivered = order.status === 'Delivered';
          const isCancelled = order.status === 'Cancelled';

          const boxStyle = isDelivered
            ? 'bg-green-50 border-green-500'
            : isCancelled
            ? 'bg-red-50 border-red-500'
            : 'bg-white border-yellow-500';

          return (
            <div
              key={order._id}
              className={`rounded-xl shadow-lg p-6 space-y-4 border-l-4 transition-all duration-300 ${boxStyle}`}
            >
              {/* Header messages */}
              {isDelivered && order.payment && (
                <div className="flex items-center gap-2 text-green-700 font-medium text-sm mb-2">
                  <FaCheckCircle />
                  <span>✅ Delivered & Payment Received</span>
                </div>
              )}
              {isCancelled && (
                <div className="flex items-center gap-2 text-red-700 font-medium text-sm mb-2">
                  <FaTimesCircle />
                  <span>❌ Order Cancelled</span>
                </div>
              )}

              {/* Info Rows */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaUser /> User Info
                  </h4>
                  <p className="text-gray-700">Name: {order.address.fullName}</p>
                  <p className="text-gray-700">Phone: {order.address.mobile}</p>
                  <p className="text-gray-700">Alt Phone: {order.address.altPhone}</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaTruck /> Delivery Info
                  </h4>
                  <p className="text-gray-700">City: {order.address.city}</p>
                  <p className="text-gray-700">State: {order.address.state}</p>
                  <p className="text-gray-700">Street: {order.address.street}</p>
                  <p className="text-gray-700">Pincode: {order.address.pincode}</p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaCalendarAlt /> Order Details
                  </h4>
                  <p className="text-gray-700">Amount: ₹{order.amount}</p>
                  <p className="text-gray-700">Mode: {order.paymentMethod}</p>
                  <p className="text-gray-700">Paid: {(isDelivered ? true : order.payment) ? 'Yes' : 'No'}</p>
                  <p className="text-gray-700">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>

                  {/* Estimated vs Delivered/Cancelled */}
                  {isDelivered ? (
                    <>
                      <p className="text-sm text-gray-500 line-through">Estimated Delivery: {estStr}</p>
                      <p className="text-green-700 font-semibold">Delivered On: {updatedStr}</p>
                    </>
                  ) : isCancelled ? (
                    <p className="text-red-600 font-semibold">Cancelled On: {updatedStr}</p>
                  ) : (
                    <p className="text-gray-700">Estimated Delivery: {estStr}</p>
                  )}

                  {/* Status dropdown */}
                  {isDelivered || isCancelled ? (
                    <div className="text-sm text-gray-500 italic mt-2">
                      Status Locked - {isCancelled ? 'Cancelled' : 'Delivered'}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="w-full sm:w-auto bg-white border border-gray-300 rounded-md px-3 py-1.5 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div className="pt-4 border-t">
                <h4 className="font-bold text-gray-800 mb-2">🛍 Ordered Items:</h4>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex flex-wrap gap-4 mb-2 text-sm text-gray-700">
                    <span className="font-medium">{item.name}</span>
                    <span>Size: {item.size}</span>
                    <span>Qty: {item.quantity}</span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
    
  );
}

export default Orders;
