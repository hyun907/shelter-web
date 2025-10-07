import type { RouteGuide } from "../types/route";
import { formatDurationFromMs } from "./formatDuration";

export function calculateRoute(route: RouteGuide[]) {
  const totalDistance = route.reduce((sum, step) => sum + step.distance, 0);
  const totalDurationCentisec = route.reduce((sum, step) => sum + step.duration, 0);

  const totalDurationStr = formatDurationFromMs(totalDurationCentisec);

  return { totalDistance, totalDurationCentisec, totalDurationStr };
}
