import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const port=process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ["https://quick-kart-website.onrender.com","https://quick-kart-website-admin.onrender.com"],
        credentials: true
    }
));

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/product",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes);

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
    connectDb();
});

