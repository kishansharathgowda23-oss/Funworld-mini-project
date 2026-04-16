import api from "./api";

export const fetchAdminStats = async () => {
  const { data } = await api.get("/admin/stats");
  return data;
};

export const fetchAdminMeta = async () => {
  const { data } = await api.get("/admin/meta");
  return data;
};

export const fetchAdminBookings = async () => {
  const { data } = await api.get("/admin/bookings");
  return data;
};

export const updateAdminBooking = async (id, payload) => {
  const { data } = await api.patch(`/admin/bookings/${id}`, payload);
  return data;
};

export const createRide = async (formData) => {
  const { data } = await api.post("/admin/rides", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteRide = async (id) => {
  const { data } = await api.delete(`/admin/rides/${id}`);
  return data;
};

export const createCoupon = async (payload) => {
  const { data } = await api.post("/admin/coupons", payload);
  return data;
};

