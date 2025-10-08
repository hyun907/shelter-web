import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_MEMBER_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
