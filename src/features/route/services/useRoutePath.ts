import { useQuery } from "@tanstack/react-query";
import type { RoutePathParams, RoutePathResponse } from "../types/route";

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

      const response = await fetch(`/route/path?${query.toString()}`);

      if (!response.ok) {
        throw new Error("경로 불러오기 실패");
      }

      const data = await response.json();
      return data as RoutePathResponse;
    },
    enabled: !!params.startLat && !!params.startLot && !!params.goalLat && !!params.goalLot
  });
}
