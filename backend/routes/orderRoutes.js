import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { allOrders, placeOrder, updateStatus, userOrders } from "../controllers/orderControllers.js";
import adminAuth from "../middlewares/adminAuth.js";

const orderRoutes=express.Router();

orderRoutes.post("/placeorder",isAuth,placeOrder);
orderRoutes.post("/userorder",isAuth,userOrders);

orderRoutes.post("/list",adminAuth,allOrders);
orderRoutes.post("/status",adminAuth,updateStatus)

export default orderRoutes;