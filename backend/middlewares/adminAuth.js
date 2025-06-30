import jwt from "jsonwebtoken";

const adminAuth=async (req ,res , next)=>{
    try{
    let {token}=req.cookies;

    if (!token || typeof token !== "string") {
      return res.status(400).json({ message: "No valid token found" });
    }
    
    let verifyToken=jwt.verify(token,process.env.JWT_SECRET);

    if(!verifyToken){
        return res.status(400).json({message:"Not Authorized, Invalid token!"})
    }
    req.adminEmail=process.env.ADMIN_EMAIL;
    next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "adminAuth error", error: err.message });
    } 
}

export default adminAuth;