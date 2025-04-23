import { Router } from "express";
import { getHospitals, createBooking, createHospital } from "./booking.controller";

const router = Router();

router.get("/hospitals", getHospitals);
router.post("/create-hospital", createHospital);
router.post("/", createBooking);

export default router;
