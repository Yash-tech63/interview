
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.PROD
        ? "https://interview-lovat-one.vercel.app/api"
        : "http://localhost:3000/api",
    withCredentials: true
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;
