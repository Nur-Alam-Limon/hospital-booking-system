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
- **Dockerized Frontend**
- Clean and simple UI designed for maintainability

### Backend (Node.js + Express + PostgreSQL + Prisma)
- **User Registration/Login**
- **JWT-based Authentication**
- **API Endpoint to Fetch Hospitals**
- **API Endpoint to Create Booking**
- **Authorization Middleware**
- **Validation & Error Handling**
- **Dockerized PostgreSQL setup and also Backend**

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
- `Docker` for containerized PostgreSQL

---

## How to Run

### Full Project with Docker (Recommended)

1. Clone the repository and navigate to the root folder.

2. Create `.env` file in `/backend`:
   ```
   DATABASE_URL=postgresql://user:password@hospital-db:5432/hospitaldb
   JWT_SECRET=your_jwt_secret
   PORT=5000
   JWT_EXPIRATION=1h
   JWT_REFRESH_EXPIRATION=10d
   ```

3. Build and start the full system:
   ```bash
   docker compose up --build
   ```

4. Run migrations inside the backend container:
   ```bash
   docker exec -it hospital-backend sh
   npx prisma migrate dev --name init
   ```

> You can also use `npx prisma migrate reset` if you're starting fresh.

---

### Backend Setup (Run Without Docker)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up `.env`:
   ```
   DATABASE_URL=postgresql://localhost:5432/hospitaldb
   JWT_SECRET=your_jwt_secret
   PORT=5000
   JWT_EXPIRATION=1h
   JWT_REFRESH_EXPIRATION=10d
   ```

4. Run migrations and generate Prisma client:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

---

### Frontend Setup (Expo App)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the base API URL in `services/api.js` to your backend's IP (e.g., if using Docker: `http://localhost:5000` or your local network IP).

4. Start the Expo app:
   ```bash
   expo start
   ```

> Use Expo Go on your phone or an emulator to run the app.

---

## API Overview

### `POST /api/auth/register`
Register a new user

### `POST /api/auth/login`
Authenticate user and receive JWT token

### `POST /api/auth/refresh-token`
Generated a refresh token for verification based on jwt

### `GET /api/bookings`
Returns list of all bookings for that user

### `POST /api/bookings`
Create a new booking  

### `GET /api/hospitals`
Returns list of all hospitals

### `POST /api/hospitals/create`
Create a hospital with services provided

**Protected**: Requires Bearer token in `Authorization` header

---

## Decisions

- Used **Prisma** for faster dev workflow, type safety, and modern ORM patterns.
- JWT decoding was shifted to **backend** for better security and to avoid exposing token structure on the client.
- Used **Expo SecureStore** to safely store JWTs on device.
- Used refresh token with jwt to make more secure
- Backend and database run in Docker for consistent development environments.

---

## GitHub

[https://github.com/Nur-Alam-Limon]

