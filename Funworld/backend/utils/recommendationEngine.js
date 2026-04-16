const interestMap = {
  water: ["Water Rides"],
  thrill: ["Dry Rides"],
  kids: ["Kids Zone"],
  gaming: ["VR / Gaming"],
};

export const buildRecommendations = (rides, age, interests = []) => {
  const categories = new Set(
    interests.flatMap((interest) => interestMap[interest.toLowerCase()] || [])
  );

  return rides
    .filter((ride) => {
      if (age < 8) {
        return ride.category === "Kids Zone" || ride.thrillLevel === "Low";
      }

      if (age < 15) {
        return ride.thrillLevel !== "High";
      }

      return true;
    })
    .sort((a, b) => {
      const aScore = categories.has(a.category) ? 2 : 0;
      const bScore = categories.has(b.category) ? 2 : 0;
      return bScore - aScore || a.waitTime - b.waitTime;
    })
    .slice(0, 5);
};

export const buildDayPlan = (rides, availableHours, focusCategory) => {
  const filtered = focusCategory
    ? rides.filter((ride) => ride.category === focusCategory)
    : rides;

  const itinerary = [];
  let remainingMinutes = availableHours * 60;

  for (const ride of filtered.sort((a, b) => a.waitTime - b.waitTime)) {
    const estimatedDuration = 30 + ride.waitTime;
    if (remainingMinutes < estimatedDuration) {
      continue;
    }

    itinerary.push({
      rideId: ride._id,
      rideName: ride.name,
      category: ride.category,
      slotMinutes: estimatedDuration,
      tip: ride.thrillLevel === "High" ? "Have a rest stop after this ride." : "Great family-friendly pick.",
    });

    remainingMinutes -= estimatedDuration;
  }

  return itinerary;
};

