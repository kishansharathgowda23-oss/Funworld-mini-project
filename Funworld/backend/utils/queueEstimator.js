export const estimateQueue = (currentWait, category) => {
  const categoryBias = {
    "Water Rides": 5,
    "Dry Rides": 8,
    "Kids Zone": 4,
    "VR / Gaming": 6,
  };

  const variation = Math.floor(Math.random() * 11) - 5;
  const nextWait = Math.max(5, currentWait + variation + (categoryBias[category] || 0) / 2);
  return Math.min(90, Math.round(nextWait));
};

