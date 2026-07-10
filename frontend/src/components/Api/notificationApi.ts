import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_NOTIFICATION_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getNotifications = (page = 1, limit = 20) => {
  return api.get(`/?page=${page}&limit=${limit}`);
};

export const markNotificationAsRead = (notificationId: string) => {
  return api.patch(`/${notificationId}/read`);
};

export const markAllNotificationsAsRead = () => {
  return api.patch(`/mark-all-read`);
};

export const deleteNotification = (notificationId: string) => {
  return api.delete(`/${notificationId}`);
};