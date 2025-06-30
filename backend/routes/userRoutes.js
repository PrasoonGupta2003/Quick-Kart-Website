import express from "express";
import { getAdmin, getCurrentUser } from "../controllers/userControllers.js";
import isAuth from "../middlewares/isAuth.js";
import adminAuth from "../middlewares/adminAuth.js";
import { getDashboardStats } from "../controllers/adminController.js";

const userRoutes = express.Router();

userRoutes.get("/getCurrentUser", isAuth, getCurrentUser); 
userRoutes.get("/getAdmin", adminAuth, getAdmin);
userRoutes.get("/dashboard-stats", adminAuth,getDashboardStats)

export default userRoutes;
