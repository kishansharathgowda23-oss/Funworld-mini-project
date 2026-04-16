import Ride from "../models/Ride.js";
import { buildRecommendations, buildDayPlan } from "../utils/recommendationEngine.js";
import { buildWeatherSuggestions } from "../utils/weatherAdvisor.js";

export const getRecommendations = async (req, res) => {
  const { age = 18, interests = "" } = req.query;
  const rides = await Ride.find({ availability: true });
  const recommended = buildRecommendations(
    rides,
    Number(age),
    interests
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );

  res.json(recommended);
};

export const getWeatherSuggestions = async (req, res) => {
  const { condition } = req.query;
  res.json(buildWeatherSuggestions(condition));
};

export const planDay = async (req, res) => {
  const { availableHours = 6, focusCategory = "" } = req.body;
  const rides = await Ride.find({ availability: true });
  const itinerary = buildDayPlan(rides, Number(availableHours), focusCategory);
  res.json({ itinerary });
};

export const triggerSos = async (req, res) => {
  const { message = "Need assistance", location = "Unknown zone" } = req.body;

  res.status(201).json({
    acknowledged: true,
    incidentId: `SOS-${Date.now()}`,
    message,
    location,
    responseEta: "3-5 minutes",
  });
};

