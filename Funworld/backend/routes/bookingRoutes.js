import express from "express";
import {
  bookTicket,
  cancelBooking,
  getUserBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book-ticket", protect, bookTicket);
router.get("/user-bookings", protect, getUserBookings);
router.patch("/user-bookings/:id/cancel", protect, cancelBooking);

export default router;

