import express from "express";
import {
  getAdminMeta,
  getAdminStats,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/adminController.js";
import {
  createRide,
  deleteRide,
  updateRide,
} from "../controllers/rideController.js";
import { createCoupon } from "../controllers/couponController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);
router.get("/stats", getAdminStats);
router.get("/meta", getAdminMeta);
router.get("/bookings", getAllBookings);
router.patch("/bookings/:id", updateBookingStatus);
router.post("/rides", upload.single("imageFile"), createRide);
router.put("/rides/:id", upload.single("imageFile"), updateRide);
router.delete("/rides/:id", deleteRide);
router.post("/coupons", createCoupon);

export default router;

