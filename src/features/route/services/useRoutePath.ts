import { useQuery } from "@tanstack/react-query";
import type { RoutePathParams, RoutePathResponse } from "../types/route";
import axios from "axios";

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

      const response = await axios.get(`/api/route/path?${query.toString()}`);

      return response.data as RoutePathResponse;
    },
    enabled: !!params.startLat && !!params.startLot && !!params.goalLat && !!params.goalLot
  });
}
