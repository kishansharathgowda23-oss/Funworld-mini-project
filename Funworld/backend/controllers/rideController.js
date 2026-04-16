import Ride from "../models/Ride.js";
import { estimateQueue } from "../utils/queueEstimator.js";

export const getRides = async (req, res) => {
  const category = req.query.category;
  const featured = req.query.featured === "true";
  const query = {};

  if (category) {
    query.category = category;
  }

  if (featured) {
    query.featured = true;
  }

  const rides = await Ride.find(query).sort({ createdAt: -1 });
  const refreshed = rides.map((ride) => ({
    ...ride.toObject(),
    waitTime: estimateQueue(ride.waitTime, ride.category),
  }));

  res.json(refreshed);
};

export const createRide = async (req, res) => {
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
  const ride = await Ride.create({ ...req.body, image });
  res.status(201).json(ride);
};

export const updateRide = async (req, res) => {
  const ride = await Ride.findById(req.params.id);
  if (!ride) {
    res.status(404);
    throw new Error("Ride not found.");
  }

  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image || ride.image;
  Object.assign(ride, { ...req.body, image });
  const updated = await ride.save();
  res.json(updated);
};

export const deleteRide = async (req, res) => {
  const ride = await Ride.findById(req.params.id);
  if (!ride) {
    res.status(404);
    throw new Error("Ride not found.");
  }

  await ride.deleteOne();
  res.json({ message: "Ride deleted successfully." });
};

