import { useEffect, useState } from "react";
import { fetchTodayWeather } from "../services/weather";
import { toTodayWeatherResponse } from "../schemas/weather.schema";
import type { TodayWeatherResponse } from "../schemas/weather.schema";
import { extractAxiosErrorMessage } from "../../../common/utils/http";

export function useTodayWeather(
  position: google.maps.LatLngLiteral | null,
  options?: { baseUrl?: string }
) {
  const [data, setData] = useState<TodayWeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!position) return;

    let aborted = false;
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetchTodayWeather({
      userLat: position.lat,
      userLot: position.lng,
      baseUrl: options?.baseUrl,
      signal: controller.signal
    })
      .then(json => {
        if (aborted) return;
        const parsed = toTodayWeatherResponse(json);
        setData(parsed);
      })
      .catch(err => {
        if (aborted) return;
        setError(extractAxiosErrorMessage(err));
      })
      .finally(() => {
        if (aborted) return;
        setLoading(false);
      });

    return () => {
      aborted = true;
      controller.abort();
    };
  }, [position, options?.baseUrl]);

  return { data, loading, error } as const;
}
