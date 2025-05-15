import axios from "axios"
import { jwtDecode } from "jwt-decode"


// export const BASE_URL ="http://127.0.0.1:8000"

// export const BASE_URL = import.meta.env.VITE_BASE_URL || "https://127.0.0.1:8000";
// api.js
export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://192.168.1.10:8000";



const api = axios.create({
    baseURL: BASE_URL
    // headers: {
    //   "Content-Type": "application/json",
    // },
})




api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiry_data = decoded.exp;
        const current_time = Date.now() / 1000; // corrected 'Data' to 'Date'

        if (expiry_data > current_time) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
