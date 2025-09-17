import axios from "axios";
import { buildApiUrl } from "../../../common/utils/url";

export async function fetchTodayWeather(params: {
  userLat: number;
  userLot: number;
  baseUrl?: string;
  signal?: AbortSignal;
}) {
  const { userLat, userLot, baseUrl, signal } = params;

  const apiBase = import.meta.env.VITE_API_BASE_URL || baseUrl;
  const urlStr = buildApiUrl(apiBase, "/weather/today");

  // 배포 환경에서 URL 확인을 위한 로깅
  console.log("날씨 API 요청 URL:", urlStr);
  console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

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
