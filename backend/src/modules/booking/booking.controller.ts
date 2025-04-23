import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = 'jwtsecretcodegoeshere1234';

export const createBooking = async (req: Request, res: Response) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(403).json({ message: 'No token provided' });
      return;
    }

    // Decode the token 
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string }; 

    const userId = decoded.userId; 

    const { hospitalId, service } = req.body;

    // Fetch hospital data from the database
    const hospital = await prisma.hospital.findUnique({
      where: { id: hospitalId },
    });

    if (!hospital || !hospital.services.includes(service.trim())) {
      res.status(400).json({ message: 'Invalid hospital or service' });
      return;
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: { userId, hospitalId, service },
    });

    res.json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


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
