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

export const getBookings = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(403).json({ message: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    const userId = decoded.userId;

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { hospital: true },
      orderBy: { date: 'desc' },
    });

    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

