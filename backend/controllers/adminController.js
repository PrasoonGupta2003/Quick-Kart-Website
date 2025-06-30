import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [orders, users, products] = await Promise.all([
      Order.find({}),
      User.find({}),
      Product.find({})
    ]);

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
    
    const pendingOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
    const deliveredOrders = orders.filter(o => o.status === 'Delivered');
    const cancelledOrders = orders.filter(o => o.status === 'Cancelled');

    const registeredUsers = users.length;
    const totalProducts = products.length;

    return res.status(200).json({
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      registeredUsers,
      totalProducts,
    });
  } catch (error) {
    console.log("Dashboard error:", error);
    return res.status(500).json({ message: "Error fetching dashboard data" });
  }
};
