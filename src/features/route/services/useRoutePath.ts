import { useQuery } from "@tanstack/react-query";
import type { RoutePathParams, RoutePathResponse } from "../types/route";
import axios from "axios";
import { buildApiUrl } from "@/common/utils/url";
export function useRoutePath(params: RoutePathParams) {
  return useQuery<RoutePathResponse, Error>({
    queryKey: ["routePath", params],
    queryFn: async () => {
      const { startLat, startLot, goalLat, goalLot } = params;
      const query = new URLSearchParams({
        startLat: startLat.toString(),
        startLot: startLot.toString(),
        goalLat: goalLat.toString(),
        goalLot: goalLot.toString()
      });

      const queryString = query.toString();

      // 개발 환경: Vite 프록시 사용
      if (import.meta.env.DEV) {
        console.log("개발 환경으로 실행됨");
        const res = await axios.get(`/route/path?${queryString}`, {
          withCredentials: true
        });
        return res.data as RoutePathResponse;
      }

      // 배포 환경: 절대 경로 + 환경 변수 사용
      console.log("배포 환경으로 실행됨");
      let apiBase: string | undefined;

      if (import.meta.env.VITE_API_BASE_URL) {
        apiBase = import.meta.env.VITE_API_BASE_URL;
      } else if (import.meta.env.VITE_PROXY_TARGET) {
        apiBase = import.meta.env.VITE_PROXY_TARGET;
      }

      const urlStr = buildApiUrl(apiBase, `/api/route/path?${queryString}`);

      console.log("배포 환경 API 요청 URL:", urlStr);
      console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
      console.log("import.meta.env.DEV:", import.meta.env.DEV);

      const res = await axios.get(urlStr, {
        withCredentials: true
      });

      return res.data as RoutePathResponse;
    }
  });
}
