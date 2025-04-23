# Hospital Booking System 

A cross-platform mobile app (built with Expo) with a backend API (built with Express.js, Prisma ORM, and PostgreSQL) to simulate a simple hospital booking system.

---

## Features

### Mobile App (Frontend - React Native with Expo)
- **User Authentication** (Email & Password)
- **List of Hospitals** fetched from the backend
- **Service Booking**: Select a service/test and book an appointment
- **Validation & Error Handling**
- **Bottom Navigation** between Home & Booking
- **Token-based Authorization** using Bearer JWT
- Clean and simple UI designed for maintainability

### Backend (Node.js + Express + PostgreSQL + Prisma)
- **User Registration/Login**
- **JWT-based Authentication**
- **API Endpoint to Fetch Hospitals**
- **API Endpoint to Create Booking**
- **Authorization Middleware**
- **Validation & Error Handling**

---

## Tech Stack

### Frontend (React Native - Expo)
- `React Native` via `Expo`
- `React Navigation` for routing & bottom tabs
- `Axios` for HTTP requests
- `SecureStore` for storing tokens securely
- `jwt-decode` for client-side decoding (initially used, later moved to backend)

### Backend (Node.js)
- `Express.js` for building REST API
- `Prisma ORM` for database queries
- `PostgreSQL` as the database
- `bcryptjs` for password hashing
- `jsonwebtoken` for user authentication
- `dotenv` for config management

---

## How to Run

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env`:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/hospitaldb
   JWT_SECRET=your_jwt_secret
   PORT=5000
   JWT_EXPIRATION=1h
   JWT_REFRESH_EXPIRATION=10d
   ```

5. Run migrations and seed data:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

6. Start the server:
   ```bash
   npm run dev
   ```

---

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo app:
   ```bash
   expo start
   ```

4. Make sure to update `API_BASE_URL` in `services/api.js` to point to backend.

---

## API Overview

### `POST /api/auth/register`
Register a new user

### `POST /api/auth/login`
Authenticate user and receive JWT token

### `POST /api/auth/refresh-token`
Generated a refresh token for verification based on jwt

### `GET /api/bookings/hospitals`
Returns list of hospitals with their available services

### `POST /api/bookings`
Create a new booking  
**Protected**: Requires Bearer token in `Authorization` header

---

## Decisions

- Used **Prisma** for faster dev workflow, type safety, and modern ORM patterns.
- JWT decoding was shifted to **backend** for better security and to avoid exposing token structure on the client.
- Used **Expo SecureStore** to safely store JWTs on device.
- Used refresh token with jwt to make more secure

---

## GitHub

[https://github.com/Nur-Alam-Limon]

