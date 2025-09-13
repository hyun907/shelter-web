import { useMemo } from "react";
import type { TodayWeatherResponse } from "../schemas/weather.schema";
import { toEmojiByCode, normalizeTemp } from "../utils/weather";

export function useWeatherButtonLabel(
  weather: TodayWeatherResponse | null,
  loading?: boolean,
  error?: string | null
) {
  return useMemo(() => {
    if (loading) return "불러오는 중...";
    if (error) return "오류";
    if (!weather) return "날씨 없음";
    const emoji = toEmojiByCode(weather.sky, weather.pty);
    const temp = normalizeTemp(weather.tmp);
    return `${emoji} ${temp}`;
  }, [weather, loading, error]);
}
