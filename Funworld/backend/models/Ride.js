import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Water Rides", "Dry Rides", "Kids Zone", "VR / Gaming"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    thrillLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    waitTime: {
      type: Number,
      default: 15,
    },
    description: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Ride = mongoose.model("Ride", rideSchema);

export default Ride;

