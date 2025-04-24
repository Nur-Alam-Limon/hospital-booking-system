import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
export const getHospitals = async (_req: Request, res: Response) => {
    const hospitals = await prisma.hospital.findMany();
    res.json(hospitals);
  };
  
  // Create a new hospital
  export const createHospital = async (req: Request, res: Response) => {
    const { name, services } = req.body;
  
    // Validate if services are an array
    if (!Array.isArray(services)) {
      res.status(400).json({ message: "Services must be an array" });
      return;
    }
  
    try {
      const newHospital = await prisma.hospital.create({
        data: {
          name,
          services,
        },
      });
      res.status(201).json({ message: "Hospital created successfully", newHospital });
    } catch (error) {
      res.status(500).json({ message: "Error creating hospital", error });
    }
  };