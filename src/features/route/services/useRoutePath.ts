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

      // 개발 환경: Vite 프록시 사용
      if (import.meta.env.DEV) {
        const res = await axios.get(`/route/path?${query.toString()}`, {
          withCredentials: true
        });
        return res.data as RoutePathResponse;
      }

      // 배포 환경: 절대 경로 + 환경 변수 사용
      let apiBase: string | undefined;

      if (import.meta.env.VITE_API_BASE_URL) {
        apiBase = import.meta.env.VITE_API_BASE_URL;
      } else if (import.meta.env.VITE_PROXY_TARGET) {
        apiBase = import.meta.env.VITE_PROXY_TARGET;
      }

      const urlStr = buildApiUrl(apiBase, `/api/route/path?${query.toString()}`);

      const res = await axios.get(urlStr, {
        withCredentials: true
      });
      // 배포 환경에서 URL 확인을 위한 로깅
      console.log("로컬 경로 API 요청 URL:", urlStr);
      console.log("배포경로 VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

      return res.data as RoutePathResponse;
    },
    enabled: !!params.startLat && !!params.startLot && !!params.goalLat && !!params.goalLot
  });
}
