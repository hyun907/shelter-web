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

  // 개발 환경에서는 프록시를 위해 상대 경로 사용
  if (import.meta.env.DEV) {
    const res = await axios.get(endpoint, {
      headers: {
        userLat: String(userLat),
        userLot: String(userLot)
      },
      params: { userLat, userLot },
      signal
    });

    const raw = res.data as unknown;
    if (Array.isArray(raw)) return raw as NearbyShelterApiResponse;
    if (raw && typeof raw === "object" && Array.isArray((raw as Record<string, unknown>).data))
      return (raw as Record<string, unknown>).data as NearbyShelterApiResponse;
    return [] as NearbyShelterApiResponse;
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
  if (raw && typeof raw === "object" && Array.isArray((raw as Record<string, unknown>).data))
    return (raw as Record<string, unknown>).data as NearbyShelterApiResponse;
  return [] as NearbyShelterApiResponse;
}
