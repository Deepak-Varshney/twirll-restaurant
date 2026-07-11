import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL==='http://localhost:3201/api'?'/api':`${import.meta.env.VITE_API_URL}`}`,
  withCredentials: true
});

export default api;