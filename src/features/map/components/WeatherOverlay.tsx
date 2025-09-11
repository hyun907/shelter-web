import { memo, useMemo } from "react";
import type { TodayWeatherResponse } from "../schemas/weather.schema";
import styles from "./WeatherOverlay.module.css";
import { toEmojiByCode, normalizeTemp } from "../utils/weather";
import { useModalStore } from "@/common/hooks/useModalStore";
import { WeatherModalContent } from "./WeatherModalContent";

type Props = {
  weather: TodayWeatherResponse | null;
  loading?: boolean;
  error?: string | null;
};

function WeatherOverlayComponent({ weather, loading, error }: Props) {
  const open = useModalStore(state => state.open);

  const buttonText = useMemo(() => {
    if (loading) return "불러오는 중...";
    if (error) return "오류";
    if (!weather) return "날씨 없음";
    const emoji = toEmojiByCode(weather.sky, weather.pty);
    const temp = normalizeTemp(weather.tmp);
    return `${emoji} ${temp}`;
  }, [weather, loading, error]);

  const handleOpen = () => {
    open(<WeatherModalContent weather={weather} loading={loading} error={error} />, {
      ariaLabel: "오늘의 날씨"
    });
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        disabled={loading || !!error}
        onClick={handleOpen}
        aria-expanded={false}
      >
        {buttonText}
      </button>
    </div>
  );
}

export const WeatherOverlay = memo(WeatherOverlayComponent);
