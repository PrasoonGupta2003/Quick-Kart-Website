import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(serverUrl + '/api/user/dashboard-stats', { withCredentials: true });
        setStats(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-cyan-500">📊 Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white font-semibold">
  <div className="bg-blue-600 rounded-xl p-6 shadow-xl">
    Total Orders: {stats?.totalOrders ?? 0}
  </div>
  <div className="bg-green-600 rounded-xl p-6 shadow-xl">
    Revenue: ₹{stats?.totalRevenue ?? 0}
  </div>
  <div className="bg-yellow-600 rounded-xl p-6 shadow-xl">
    Pending Orders: {stats?.pendingOrders?.length ?? 0}
  </div>
  <div className="bg-emerald-600 rounded-xl p-6 shadow-xl">
    Delivered Orders: {stats?.deliveredOrders?.length ?? 0}
  </div>
  <div className="bg-red-500 rounded-xl p-6 shadow-xl">
    Canceled Orders: {stats?.cancelledOrders?.length ?? 0}
  </div>
  <div className="bg-indigo-600 rounded-xl p-6 shadow-xl">
    Users Registered: {stats?.registeredUsers ?? 0}
  </div>
  <div className="bg-pink-600 rounded-xl p-6 shadow-xl">
    Products in Store: {stats?.totalProducts ?? 0}
  </div>
</div>

{/* Pending Orders Detail Section */}
<div className="bg-white rounded-xl p-6 shadow text-gray-800">
  <h3 className="text-2xl font-semibold mb-4">📦 Pending Orders to Deliver</h3>

  {stats?.pendingOrders?.length === 0 ? (
    <p className="text-gray-600">No pending orders.</p>
  ) : (
    <div className="space-y-6">
      {stats.pendingOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm"
        >
          <div className="text-lg font-semibold mb-2 text-gray-900">
            🛍️ Order #{order._id.slice(-6)}
          </div>

          <div className="mb-2">
            <strong>📦 Items:</strong>
            <ul className="list-disc ml-6 mt-1">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} ({item.size}) x {item.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-2">
            <strong>📍 Address:</strong>{' '}
            {`${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`}
          </div>
              <div className="mb-2">
            <strong>📞 Mobile:</strong> {order.address.mobile}
            </div>

          <div>
            <strong>📅 Estimated Delivery:</strong>{' '}
            {new Date(order.date + 3 * 86400000).toLocaleDateString('en-IN', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </div>
        </div>
      ))}
    </div>
  )}
</div>


    </div>
  );
}

export default AdminDashboard;