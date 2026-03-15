import express from 'express';
import User from '../models/users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    console.log("BODY 👉", req.body);

    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password
    });

    res.status(201).json({
      message: 'User registered successfully',
      user
    });

  } catch (error) {
    console.error("REGISTER ERROR ❌", error);
    res.status(500).json({ error: error.message });
  }
});

  router.post('/login', async (req, res) => {
    try {
      const { email, phone, password } = req.body;

      if ((!email && !phone) || !password) {
        return res.status(400).json({ message: "Email/Phone and password are required" });
      }

      const user = await User.findOne({
        $or: [{ email }, { phone }]
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "login successful",
        user
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


export default router;
