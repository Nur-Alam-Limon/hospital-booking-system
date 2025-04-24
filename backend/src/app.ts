import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes";
import bookingRoutes from "./modules/booking/booking.routes";
import hospitalRoutes from "./modules/hospital/hospital.routes";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/hospitals", hospitalRoutes);

export default app;
