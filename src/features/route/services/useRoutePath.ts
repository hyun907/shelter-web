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

      let url = "";

      if (import.meta.env.DEV) {
        // 개발 환경: Vite 프록시 사용
        url = `/route/path?${query.toString()}`;
      } else {
        // 배포 환경: 절대 경로 + 환경 변수
        const apiBase = import.meta.env.VITE_API_BASE_URL;
        url = buildApiUrl(apiBase, `/route/path?${query.toString()}`);
      }

      const response = await axios.get(url, {
        withCredentials: true
      });

      return response.data as RoutePathResponse;
    },
    enabled: !!params.startLat && !!params.startLot && !!params.goalLat && !!params.goalLot
  });
}
