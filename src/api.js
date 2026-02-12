// client/src/api.js
import axios from "axios";

// ✅ YEH LO TUMHARA REAL BACKEND URL
const BACKEND_URL = "https://gotravio-backend.onrender.com";  // 👈 YEH CHANGE KAR DIYA

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,  // https://gotravio-backend.onrender.com/api
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
API.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("❌ API Error:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      console.error("No response from server. Backend URL:", BACKEND_URL);
      console.error("Check if backend is running on Render");
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export const getAdminHeaders = () => {
  const token = localStorage.getItem("adminToken");
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export { API };
