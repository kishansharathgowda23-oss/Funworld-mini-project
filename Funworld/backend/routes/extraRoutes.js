import express from "express";
import {
  getRecommendations,
  getWeatherSuggestions,
  planDay,
  triggerSos,
} from "../controllers/extraController.js";

const router = express.Router();

router.get("/recommendations", getRecommendations);
router.get("/weather-suggestions", getWeatherSuggestions);
router.post("/plan-day", planDay);
router.post("/sos", triggerSos);

export default router;

