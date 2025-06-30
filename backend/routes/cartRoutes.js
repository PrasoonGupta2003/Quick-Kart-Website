import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartControllers.js';
import isAuth from '../middlewares/isAuth.js';

const cartRoutes = express.Router();

// Routes
cartRoutes.post('/get', isAuth, getUserCart);
cartRoutes.post('/add', isAuth, addToCart);
cartRoutes.post('/update', isAuth, updateCart);

export default cartRoutes;
