import axios from "axios";
import { buildApiUrl } from "../../../common/utils/url";

export async function fetchTodayWeather(params: {
  userLat: number;
  userLot: number;
  baseUrl?: string;
}) {
  const { userLat, userLot, baseUrl } = params;

  const urlStr = buildApiUrl(baseUrl, "/weather/today");

  const res = await axios.get(urlStr, {
    headers: {
      userLat: String(userLat),
      userLot: String(userLot)
    },
    params: {
      userLat,
      userLot
    }
  });

  return res.data;
}
