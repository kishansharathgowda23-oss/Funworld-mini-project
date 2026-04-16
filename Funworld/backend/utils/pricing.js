export const calculateTicketPricing = ({
  ticketType,
  adults,
  children,
  addons,
}) => {
  const baseAdult = 1200;
  const baseChild = 850;
  const ticketMultipliers = {
    Regular: 1,
    "Fast Track": 1.5,
    "Group Booking": 0.9,
  };

  const addonPrices = {
    locker: 250,
    foodCombo: 450,
    priorityPass: 700,
  };

  const multiplier = ticketMultipliers[ticketType] || 1;
  const subtotal = adults * baseAdult * multiplier + children * baseChild * multiplier;

  const addonTotal = Object.entries(addons || {}).reduce((sum, [key, enabled]) => {
    if (!enabled) {
      return sum;
    }

    return sum + (addonPrices[key] || 0);
  }, 0);

  return {
    subtotal,
    addonTotal,
    totalBeforeDiscount: subtotal + addonTotal,
  };
};

