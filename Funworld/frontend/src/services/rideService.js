import api from "./api";

export const fetchRides = async (params = {}) => {
  const { data } = await api.get("/rides", { params });
  return data;
};

export const fetchRecommendations = async (params) => {
  const { data } = await api.get("/recommendations", { params });
  return data;
};

export const fetchWeatherSuggestions = async (condition) => {
  const { data } = await api.get("/weather-suggestions", { params: { condition } });
  return data;
};

export const planMyDay = async (payload) => {
  const { data } = await api.post("/plan-day", payload);
  return data;
};

