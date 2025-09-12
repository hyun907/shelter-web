import axios from "axios";
import { buildApiUrl } from "../../../common/utils/url";

export async function fetchTodayWeather(params: {
  userLat: number;
  userLot: number;
  baseUrl?: string;
  signal?: AbortSignal;
}) {
  const { userLat, userLot, baseUrl, signal } = params;

  const urlStr = buildApiUrl(baseUrl, "/weather/today");

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
