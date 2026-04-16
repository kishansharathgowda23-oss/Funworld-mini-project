import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitDate: {
      type: Date,
      required: true,
    },
    ticketType: {
      type: String,
      enum: ["Regular", "Fast Track", "Group Booking"],
      required: true,
    },
    adults: {
      type: Number,
      required: true,
      min: 0,
    },
    children: {
      type: Number,
      required: true,
      min: 0,
    },
    addons: {
      locker: { type: Boolean, default: false },
      foodCombo: { type: Boolean, default: false },
      priorityPass: { type: Boolean, default: false },
    },
    couponCode: {
      type: String,
      default: "",
    },
    pricing: {
      subtotal: { type: Number, required: true },
      addonTotal: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },
    payment: {
      status: {
        type: String,
        enum: ["success", "failed"],
        required: true,
      },
      reference: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["Approved", "Cancelled", "Pending"],
      default: "Approved",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
