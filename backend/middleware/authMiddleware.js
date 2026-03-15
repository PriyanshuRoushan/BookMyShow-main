import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    // 1️⃣ Check if token exists in header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // 2️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3️⃣ Get user from DB (exclude password)
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          message: "User not found, authorization denied",
        });
      }

      // 4️⃣ Attach user to request
      req.user = user;

      next(); // ✅ allow request to continue
    } else {
      return res.status(401).json({
        message: "No token provided, authorization denied",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token is invalid or expired",
    });
  }
};
