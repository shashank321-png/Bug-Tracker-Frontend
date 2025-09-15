import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081", // your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically for every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
