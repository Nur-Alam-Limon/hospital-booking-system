import { Router } from "express";
import { createBooking, getBookings } from "./booking.controller";

const router = Router();

router.get("/", getBookings);
router.post("/", createBooking);

export default router;
