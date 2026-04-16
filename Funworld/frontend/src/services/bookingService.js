import api from "./api";

export const applyCoupon = async (payload) => {
  const { data } = await api.post("/apply-coupon", payload);
  return data;
};

export const bookTicket = async (payload) => {
  const { data } = await api.post("/book-ticket", payload);
  return data;
};

export const fetchUserBookings = async () => {
  const { data } = await api.get("/user-bookings");
  return data;
};

export const cancelBooking = async (id) => {
  const { data } = await api.patch(`/user-bookings/${id}/cancel`);
  return data;
};

