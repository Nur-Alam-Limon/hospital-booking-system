import { Router } from "express";
import { createHospital, getHospitals } from "./hospital.controller";

const router = Router();

router.get("/", getHospitals);
router.post("/create", createHospital);

export default router;
