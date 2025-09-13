import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_MEMBER_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  async response => {
    const isGet = response.config.method === "get";
    const isJson = response.headers["content-type"]?.includes("application/json");

    if (isGet && isJson) {
      response.data = await response.data;
    }

    return response;
  },
  async error => {
    console.error("API 요청 에러:", error);
    return Promise.reject(error);
  }
);

export default api;
