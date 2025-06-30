import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Ensure all required image fields are present
    const files = req.files;
    if (
      !files?.image1?.[0] ||
      !files?.image2?.[0] ||
      !files?.image3?.[0] ||
      !files?.image4?.[0]
    ) {
      return res.status(400).json({ message: "All 4 images are required" });
    }

    // Upload images to Cloudinary
    const image1 = await uploadOnCloudinary(files.image1[0].path);
    const image2 = await uploadOnCloudinary(files.image2[0].path);
    const image3 = await uploadOnCloudinary(files.image3[0].path);
    const image4 = await uploadOnCloudinary(files.image4[0].path);

    // Create product data
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes), // Expecting stringified array
      bestseller: bestseller === "true",
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const savedProduct = await Product.create(productData);

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const listProduct=async (req,res)=>{
    try{
        const product = await Product.find({});
        return res.status(200).json(product);
    }
    catch(e){
        console.log("List fetching Error", e);
        return res.status(500).json({ success: false, message: "Error fetching product" });
    }
}

export const removeProduct=async (req,res)=>{
    try{
        let {id}=req.params;
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json(product);
    }
    catch (e){
        console.log("Error in deleting Product",e);
        return res.status(500).json({ success: false, message: "Error deleting product" });
    }
}