import express from "express";
import { adminLogin, googleLogin, login, logout, register } from "../controllers/authControllers.js";

const authRoutes=express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.post("/googleLogin", googleLogin);
authRoutes.post("/adminLogin", adminLogin);
export default authRoutes;