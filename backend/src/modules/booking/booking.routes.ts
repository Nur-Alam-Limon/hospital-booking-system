import { Router } from "express";
import { createBooking, getBookings } from "./booking.controller";
import { authenticate } from "../auth/auth.middleware";

const router = Router();

router.get("/", authenticate, getBookings);
router.post("/", authenticate, createBooking);

export default router;
