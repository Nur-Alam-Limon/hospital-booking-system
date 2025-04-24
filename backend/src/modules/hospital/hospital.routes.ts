import { Router } from "express";
import { createHospital, getHospitals } from "./hospital.controller";
import { authenticate } from "../auth/auth.middleware";

const router = Router();

router.get("/", authenticate , getHospitals);
router.post("/create", authenticate, createHospital);

export default router;
