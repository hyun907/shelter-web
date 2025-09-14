import axios from "axios";
import { buildApiUrl } from "@/common/utils/url";
import type { NearbyShelterApiResponse } from "../schemas/shelter.schema";

export async function fetchNearbyShelters(params: {
  userLat: number;
  userLot: number;
  baseUrl?: string;
  signal?: AbortSignal;
}): Promise<NearbyShelterApiResponse> {
  const { userLat, userLot, baseUrl, signal } = params;

  const urlStr = buildApiUrl(baseUrl, "/shelter/winter/near");

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
