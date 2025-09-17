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
  } else if (import.meta.env.DEV) {
    // 개발 환경: 프록시 사용 (상대 경로)
    apiBase = undefined; // 상대 경로로 프록시 사용
  } else {
    // fallback
    apiBase = baseUrl;
  }

  const urlStr = buildApiUrl(apiBase, "/weather/today");

  // 배포 환경에서 URL 확인을 위한 로깅
  console.log("날씨 API 요청 URL:", urlStr);
  console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
  console.log(
    "모든 VITE_ 환경 변수:",
    Object.keys(import.meta.env).filter(key => key.startsWith("VITE_"))
  );
  console.log("현재 모드:", import.meta.env.MODE);
  console.log("개발 모드인가?", import.meta.env.DEV);

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
