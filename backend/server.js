import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import theatreRoutes from './routes/theatreRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import ConnectDB from './config/db.js';
import screenRoutes from './routes/screenRoutes.js';
import showRoutes from './routes/showRoutes.js';
import offerRoutes from "./routes/offerRoutes.js";
import bookingRoutes from "./routes/bookinRoutes.js";
import path from "path";



dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || "http://localhost:3000", credentials: true }));

const __dirname = path.resolve();


/* 🔴 THIS MUST BE HERE */
app.use(express.json());

/* Connect DB */
ConnectDB();

/* Routes */
app.use('/api/auth', authRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/screens', screenRoutes);
app.use('/api/shows', showRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/bookings", bookingRoutes);

// public folder
app.use("/uploads", express.static("uploads"));



const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});
