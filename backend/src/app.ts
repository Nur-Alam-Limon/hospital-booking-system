import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import authRoutes from "./modules/auth/auth.routes";
import bookingRoutes from "./modules/booking/booking.routes";
import hospitalRoutes from "./modules/hospital/hospital.routes";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/hospitals", hospitalRoutes);

export default app;
