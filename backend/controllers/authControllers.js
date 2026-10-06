import User from "../models/users.js";
import jwt from "jsonwebtoken";

const createToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !password) {
      return res.status(400).json({ message: "Name, email, phone and password are required" });
    }
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();
    const existingUser = await User.findOne({ $or: [{ email: normalizedEmail }, { phone: normalizedPhone }] });
    if (existingUser) return res.status(409).json({ message: "An account with this email or phone already exists" });
    const user = await User.create({ name: name.trim(), email: normalizedEmail, phone: normalizedPhone, password });
    return res.status(201).json({ token: createToken(user._id), user: { id: user._id, name: user.name, email: user.email, phone: user.phone } });
  } catch (error) {
    return res.status(500).json({ message: "Unable to create account" });
  }
};

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
    const normalizedIdentifier = identifier.trim();
    const isEmail = normalizedIdentifier.includes("@");

    // 3️⃣ Find user
    const user = await User.findOne(
      isEmail
        ? { email: normalizedIdentifier.toLowerCase() }
        : { phone: normalizedIdentifier }
    ).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // 5️⃣ Generate JWT
    const token = createToken(user._id);

    // 6️⃣ Send response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name, email: user.email,
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
