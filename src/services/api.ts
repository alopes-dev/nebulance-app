import axios from "axios";
import { storage } from "@/utils/storage";

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: process.env.URI || "https://nebulance-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for handling tokens
api.interceptors.request.use(
  async (config) => {
    // Get token from storage
    const token = await storage.getAuthToken();

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Remove the invalid token
      await storage.removeAuthToken();
      // You might want to redirect to login screen here
      // or refresh the token if you have refresh token functionality
    }
    return Promise.reject(error);
  }
);

export default api;
