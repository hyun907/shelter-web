import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_MEMBER_API_URL}`
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.trim()}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
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
    const originalRequest = error.config;
    const errorCode = error.response?.data?.error?.errorCode;

    if (
      error.response?.status === 406 &&
      errorCode === "EXPIRED_TOKEN" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh`,
          {},
          {
            headers: {
              "Refresh-Token": refreshToken,
              "Content-Type": "application/json"
            }
          }
        );

        const newAccessToken = res.data.data.accessToken;
        const newRefreshToken = res.data.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
