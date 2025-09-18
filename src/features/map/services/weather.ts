import axios from "axios";
import { buildApiUrl } from "../../../common/utils/url";

export async function fetchTodayWeather(params: {
  userLat: number;
  userLot: number;
  baseUrl?: string;
  signal?: AbortSignal;
}) {
  const { userLat, userLot, baseUrl, signal } = params;

  // 환경별 API Base URL 설정
  let apiBase: string | undefined;

  if (import.meta.env.VITE_API_BASE_URL) {
    // 배포 환경: 환경 변수 사용
    apiBase = import.meta.env.VITE_API_BASE_URL;
  } else if (import.meta.env.VITE_PROXY_TARGET) {
    // Vercel에서 자동 설정된 프록시 타겟 사용
    apiBase = import.meta.env.VITE_PROXY_TARGET;
  } else if (import.meta.env.DEV) {
    // 개발 환경: 프록시 사용 (상대 경로)
    apiBase = undefined; // 상대 경로로 프록시 사용
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
