import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token || typeof token !== "string") {
      return res.status(400).json({ message: "No valid token found" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = verifyToken.userId;
    next();
  } catch (e) {
    console.error("Auth middleware error:", e.message);
    res.status(500).json({ message: "isAuth error", error: e.message });
  }
};

export default isAuth;
