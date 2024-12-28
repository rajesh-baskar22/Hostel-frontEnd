import axios from "axios";

const API = axios.create({
  baseURL: "https://hostel-management-backend-1-0agr.onrender.com/api/auth", //backend url
});


API.interceptors.request.use((config) => {
  const userData =JSON.parse(localStorage.getItem("userData"));
  const token = userData?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;