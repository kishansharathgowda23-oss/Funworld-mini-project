export const buildWeatherSuggestions = (condition) => {
  const normalized = (condition || "sunny").toLowerCase();

  if (normalized.includes("rain")) {
    return {
      condition: "Rainy",
      suggestedCategories: ["VR / Gaming", "Kids Zone"],
      avoidCategories: ["Water Rides"],
      message: "Indoor attractions and arcade experiences are the best fit for rainy weather.",
    };
  }

  if (normalized.includes("hot") || normalized.includes("sun")) {
    return {
      condition: "Sunny",
      suggestedCategories: ["Water Rides", "VR / Gaming"],
      avoidCategories: [],
      message: "Splash rides and cooling indoor zones will keep the day comfortable.",
    };
  }

  return {
    condition: "Pleasant",
    suggestedCategories: ["Dry Rides", "Kids Zone", "VR / Gaming"],
    avoidCategories: [],
    message: "It is a great day to explore every zone with balanced energy.",
  };
};
