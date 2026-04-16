import { customAlphabet } from "nanoid";
import Booking from "../models/Booking.js";
import Coupon from "../models/Coupon.js";
import { calculateTicketPricing } from "../utils/pricing.js";

const createBookingId = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ1234567890", 8);

const calculateDiscount = (coupon, totalBeforeDiscount) => {
  if (!coupon) {
    return 0;
  }

  if (coupon.discountType === "fixed") {
    return Math.min(coupon.discountValue, totalBeforeDiscount);
  }

  return Math.round((totalBeforeDiscount * coupon.discountValue) / 100);
};

export const bookTicket = async (req, res) => {
  const { visitDate, ticketType, adults, children, addons, couponCode, paymentMode } = req.body;

  if (!visitDate || !ticketType) {
    res.status(400);
    throw new Error("Visit date and ticket type are required.");
  }

  if ((Number(adults) || 0) + (Number(children) || 0) <= 0) {
    res.status(400);
    throw new Error("At least one visitor is required.");
  }

  const pricing = calculateTicketPricing({
    ticketType,
    adults: Number(adults),
    children: Number(children),
    addons,
  });

  let coupon = null;
  if (couponCode) {
    coupon = await Coupon.findOne({
      code: couponCode.toUpperCase(),
      active: true,
      expiryDate: { $gte: new Date() },
    });
  }

  const discount = calculateDiscount(coupon, pricing.totalBeforeDiscount);
  const total = Math.max(0, pricing.totalBeforeDiscount - discount);

  const paymentSuccess = paymentMode === "force-fail" ? false : Math.random() > 0.15;

  const booking = await Booking.create({
    bookingId: `FW-${createBookingId()}`,
    user: req.user._id,
    visitDate,
    ticketType,
    adults: Number(adults),
    children: Number(children),
    addons,
    couponCode: coupon?.code || "",
    pricing: {
      subtotal: pricing.subtotal,
      addonTotal: pricing.addonTotal,
      discount,
      total,
    },
    payment: {
      status: paymentSuccess ? "success" : "failed",
      reference: `PAY-${Date.now()}`,
    },
    status: paymentSuccess ? "Approved" : "Pending",
  });

  res.status(paymentSuccess ? 201 : 202).json(booking);
};

export const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(bookings);
};

export const cancelBooking = async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found.");
  }

  booking.status = "Cancelled";
  await booking.save();
  res.json({ message: "Booking cancelled successfully.", booking });
};

