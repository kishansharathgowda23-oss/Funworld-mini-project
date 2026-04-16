# FunWorld

FunWorld is a full-stack amusement park booking platform inspired by Wonderla and GRS Fantasy Park. It includes a React + Tailwind frontend, a Node.js + Express backend, MongoDB persistence, JWT authentication, digital ticket generation, and an admin panel for rides, bookings, and coupons.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios
- Backend: Node.js, Express, Mongoose, JWT, Multer
- Database: MongoDB
- Ticket utilities: QR code generation, PDF download

## Project Structure

```text
Funworld/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeds/
│   ├── uploads/
│   └── utils/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── utils/
│   └── public/
└── package.json
```

## Features

- Theme-park inspired homepage with carousel, offers, categories, and featured rides
- Ride catalog with live queue simulation, thrill markers, and weather hints
- Ticket booking with dynamic pricing, add-ons, coupon application, and payment simulation
- Digital pass with QR code and PDF download
- User dashboard for booking history, cancelation, and itinerary planning
- Admin dashboard for stats, ride CRUD, booking management, and coupon creation
- AI-style ride recommendation engine based on age and interests
- Weather-based ride suggestions
- Emergency SOS quick action panel

## Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas URI

## Environment Variables

Copy both example files and adjust values as needed.

```bash
backend/.env
frontend/.env
```

## Install

From the project root:

```bash
npm install
npm run install:all
```

## Seed Sample Data

```bash
npm run seed
```

This creates:

- Demo admin user: `admin@funworld.com` / `Admin@123`
- Demo user: `guest@funworld.com` / `Guest@123`
- Sample rides and coupons

## Run in Development

```bash
npm run dev
```

This starts:

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## Build for Production

```bash
npm run build
```

