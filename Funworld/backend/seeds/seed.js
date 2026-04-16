import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import Ride from "../models/Ride.js";
import Coupon from "../models/Coupon.js";
import Booking from "../models/Booking.js";
import { connectDB } from "../utils/connectDB.js";

dotenv.config({ path: "backend/.env" });

const rides = [
  {
    name: "Cyclone Splash",
    category: "Water Rides",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    thrillLevel: "High",
    waitTime: 32,
    description: "A spiraling raft ride with giant splash drops and music-driven light tunnels.",
    featured: true,
  },
  {
    name: "Tsunami Twister",
    category: "Water Rides",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    thrillLevel: "Medium",
    waitTime: 24,
    description: "A family water coaster with rolling waves and tunnel slides.",
    featured: true,
  },
  {
    name: "Sky Screamer",
    category: "Dry Rides",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
    thrillLevel: "High",
    waitTime: 38,
    description: "A towering drop ride designed for adrenaline seekers.",
    featured: true,
  },
  {
    name: "Jungle Rally",
    category: "Kids Zone",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    thrillLevel: "Low",
    waitTime: 12,
    description: "Mini safari cars for young adventurers with playful animatronics.",
    featured: true,
  },
  {
    name: "Pixel Arena",
    category: "VR / Gaming",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    thrillLevel: "Medium",
    waitTime: 18,
    description: "Competitive VR missions, rhythm games, and mixed reality challenges.",
    featured: false,
  },
  {
    name: "Thunder Loop",
    category: "Dry Rides",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
    thrillLevel: "High",
    waitTime: 41,
    description: "A high-speed looping coaster with corkscrews and sharp bank turns.",
    featured: false,
  }
];

const coupons = [
  {
    code: "FUN10",
    discountType: "percentage",
    discountValue: 10,
    expiryDate: new Date("2026-12-31"),
    active: true,
  },
  {
    code: "SPLASH200",
    discountType: "fixed",
    discountValue: 200,
    expiryDate: new Date("2026-12-31"),
    active: true,
  }
];

const seed = async () => {
  try {
    await connectDB();
    await Promise.all([
      User.deleteMany(),
      Ride.deleteMany(),
      Coupon.deleteMany(),
      Booking.deleteMany(),
    ]);

    await User.create([
      {
        name: "FunWorld Admin",
        email: "admin@funworld.com",
        password: "Admin@123",
        role: "admin",
      },
      {
        name: "Demo Guest",
        email: "guest@funworld.com",
        password: "Guest@123",
        role: "user",
      },
    ]);

    await Ride.insertMany(rides);
    await Coupon.insertMany(coupons);

    console.log("Seed completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seed();

