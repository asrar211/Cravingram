import axios from "axios";

export const api  = axios.create({
    baseURL: import.meta.env.VITE_API_URL || `https://cravingram.onrender.com/api/v1`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});