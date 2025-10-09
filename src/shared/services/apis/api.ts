import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_MEMBER_API_URL}members`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  response => {
    console.log("API Response 임시테스트 콘솔:", response);
    return response.data;
  },
  error => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
