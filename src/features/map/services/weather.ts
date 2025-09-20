import axios from "axios";
import { buildApiUrl } from "../../../common/utils/url";

export async function fetchTodayWeather(params: {
  userLat: number;
  userLot: number;
  baseUrl?: string;
  signal?: AbortSignal;
}) {
  const { userLat, userLot, baseUrl, signal } = params;

  // 개발 환경에서는 프록시를 위해 상대 경로 사용
  if (import.meta.env.DEV) {
    const res = await axios.get("/weather/today", {
      headers: {
        userLat: String(userLat),
        userLot: String(userLot)
      },
      params: {
        userLat,
        userLot
      },
      signal
    });

    return res.data;
  }

  // 배포 환경: 절대 경로 사용
  let apiBase: string | undefined;

  if (import.meta.env.VITE_API_BASE_URL) {
    // 배포 환경: 환경 변수 사용
    apiBase = import.meta.env.VITE_API_BASE_URL;
  } else if (import.meta.env.VITE_PROXY_TARGET) {
    // Vercel에서 자동 설정된 프록시 타겟 사용
    apiBase = import.meta.env.VITE_PROXY_TARGET;
  } else {
    // fallback
    apiBase = baseUrl;
  }

  const urlStr = buildApiUrl(apiBase, "/weather/today");

  const res = await axios.get(urlStr, {
    headers: {
      userLat: String(userLat),
      userLot: String(userLot)
    },
    params: {
      userLat,
      userLot
    },
    signal
  });

  return res.data;
}
