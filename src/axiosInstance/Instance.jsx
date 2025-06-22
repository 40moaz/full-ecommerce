// axiosInstance/Instance.js
import axios from "axios";

// Create a single Axios instance with optimized settings
const instance = axios.create({
  baseURL: "https://ecommerce-backend-node-three-theta.vercel.app/",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  timeout: 5000, // Reduced timeout for faster failure
  withCredentials: false, // Avoid sending cookies unless needed
});

// Optional: Add a response interceptor to handle fast error responses
instance.interceptors.response.use(
  response => response,
  error => {
    // Optionally, handle errors globally here
    return Promise.reject(error);
  }
);

export default instance;