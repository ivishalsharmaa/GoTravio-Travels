// client/src/config/api.js

// Get the base URL based on environment
const getBaseURL = () => {
  // In production, use the environment variable or the live URL
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://gotravio-backend.onrender.com';
  }
  
  // In development, use localhost
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

export const API_CONFIG = {
  baseURL: getBaseURL(),
  endpoints: {
    cabs: '/api/cabs',
    tickets: '/api/tickets',
    packages: '/api/packages',
    enquiry: '/api/enquiry',
    ai: '/api/ai',
    health: '/api/health'
  }
};

// Helper function to get full URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

// Helper to check if backend is reachable
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}/api/health`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};