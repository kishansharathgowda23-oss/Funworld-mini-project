import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";
import Coupon from "../models/Coupon.js";

export const getAdminStats = async (_req, res) => {
  const [totalBookings, approvedBookings, rides, popularRides] = await Promise.all([
    Booking.countDocuments(),
    Booking.find({ status: "Approved", "payment.status": "success" }),
    Ride.countDocuments(),
    Ride.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
  ]);

  const revenue = approvedBookings.reduce((sum, booking) => sum + booking.pricing.total, 0);

  res.json({
    totalBookings,
    rides,
    revenue,
    popularRides,
  });
};

export const getAllBookings = async (_req, res) => {
  const bookings = await Booking.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(bookings);
};

export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found.");
  }

  booking.status = req.body.status || booking.status;
  await booking.save();
  res.json(booking);
};

export const getAdminMeta = async (_req, res) => {
  const [rides, coupons] = await Promise.all([
    Ride.find().sort({ createdAt: -1 }),
    Coupon.find().sort({ createdAt: -1 }),
  ]);

  res.json({ rides, coupons });
};

