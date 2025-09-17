import axios from "axios";
import { buildApiUrl } from "@/common/utils/url";
import { getCurrentSeason } from "@/features/map/utils/weather";
import type { NearbyShelterApiResponse } from "../schemas/shelter.schema";

export async function fetchNearbyShelters(params: {
  userLat: number;
  userLot: number;
  baseUrl?: string;
  signal?: AbortSignal;
}): Promise<NearbyShelterApiResponse> {
  const { userLat, userLot, baseUrl, signal } = params;

  const season = getCurrentSeason();
  const endpoint = season === "summer" ? "/shelter/summer/near" : "/shelter/winter/near";

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

  const urlStr = buildApiUrl(apiBase, endpoint);

  const res = await axios.get(urlStr, {
    headers: {
      userLat: String(userLat),
      userLot: String(userLot)
    },
    params: { userLat, userLot },
    signal
  });

  const raw = res.data as unknown;
  if (Array.isArray(raw)) return raw as NearbyShelterApiResponse;
  if (raw && typeof raw === "object" && Array.isArray((raw as any).data))
    return (raw as any).data as NearbyShelterApiResponse;
  return [] as NearbyShelterApiResponse;
}
