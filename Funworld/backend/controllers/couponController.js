import Coupon from "../models/Coupon.js";
import { calculateTicketPricing } from "../utils/pricing.js";

export const applyCoupon = async (req, res) => {
  const { code, ticketType, adults, children, addons } = req.body;

  if (!code) {
    res.status(400);
    throw new Error("Coupon code is required.");
  }

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    active: true,
    expiryDate: { $gte: new Date() },
  });

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon is invalid or expired.");
  }

  const pricing = calculateTicketPricing({
    ticketType,
    adults: Number(adults) || 0,
    children: Number(children) || 0,
    addons,
  });

  const discount =
    coupon.discountType === "fixed"
      ? Math.min(coupon.discountValue, pricing.totalBeforeDiscount)
      : Math.round((pricing.totalBeforeDiscount * coupon.discountValue) / 100);

  res.json({
    valid: true,
    coupon,
    discount,
    finalTotal: pricing.totalBeforeDiscount - discount,
  });
};

export const createCoupon = async (req, res) => {
  const coupon = await Coupon.create({
    ...req.body,
    code: req.body.code.toUpperCase(),
  });
  res.status(201).json(coupon);
};

export const getCoupons = async (_req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json(coupons);
};
