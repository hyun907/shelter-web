import { useMemo } from "react";
import type { TodayWeatherResponse } from "../schemas/weather.schema";
import { normalizeTemp } from "../utils/weather";

export function useWeatherButtonLabel(
  weather: TodayWeatherResponse | null,
  loading?: boolean,
  error?: string | null
) {
  return useMemo(() => {
    if (loading) return "불러오는 중...";
    if (error) {
      // 에러 메시지가 "데이터 파싱 오류"로 시작하는 경우 더 구체적인 메시지 표시
      if (error.startsWith("데이터 파싱 오류")) {
        return "데이터 오류";
      }
      return "오류";
    }
    if (!weather) return "날씨 없음";
    const temp = normalizeTemp(weather.tmp);
    return temp;
  }, [weather, loading, error]);
}
