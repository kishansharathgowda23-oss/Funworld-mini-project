import express from "express";
import { applyCoupon } from "../controllers/couponController.js";

const router = express.Router();

router.post("/apply-coupon", applyCoupon);

export default router;

