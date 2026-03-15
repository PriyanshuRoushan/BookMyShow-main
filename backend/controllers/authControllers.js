import User from "../models/users.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // 1️⃣ Validation
    if (!identifier || !password) {
      return res.status(400).json({
        message: "Email/Phone and password are required",
      });
    }

    // 2️⃣ Detect email or phone
    const isEmail = identifier.includes("@");

    // 3️⃣ Find user
    const user = await User.findOne(
      isEmail
        ? { email: identifier }
        : { phone: identifier }
    );

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // 4️⃣ Compare password (PLAIN TEXT)
    if (password !== user.password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // 5️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6️⃣ Send response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
