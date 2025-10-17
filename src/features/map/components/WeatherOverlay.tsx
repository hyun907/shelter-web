import { memo } from "react";
import type { TodayWeatherResponse } from "../schemas/weather.schema";
import type { NearbyShelterApiItem } from "@/features/shelter/schemas/shelter.schema";
import styles from "./WeatherOverlay.module.css";
import { useModalStore } from "@/common/hooks/useModalStore";
import { WeatherModalContent } from ".";
import { WeatherButton } from ".";
import { useWeatherButtonLabel } from "../hooks/useWeatherButtonLabel";
import { CurrentLocationButton } from "./CurrentLocationButton";

type Props = {
  weather: TodayWeatherResponse | null;
  loading?: boolean;
  error?: string | null;
  shelters?: NearbyShelterApiItem[] | null;
  sheltersError?: string | null;
  onCurrentLocationClick?: () => void;
};

function WeatherOverlayComponent({
  weather,
  loading,
  error,
  shelters,
  sheltersError,
  onCurrentLocationClick
}: Props) {
  const open = useModalStore(state => state.open);

  const buttonText = useWeatherButtonLabel(weather, loading, error);

  const handleOpen = () => {
    open(<WeatherModalContent weather={weather} loading={loading} error={error} />, {
      ariaLabel: "오늘의 날씨"
    });
  };

  return (
    <div className={styles.container}>
      <WeatherButton
        label={buttonText}
        weather={weather}
        disabled={loading || !!error}
        onClick={handleOpen}
        shelters={shelters}
        sheltersError={sheltersError}
      />
      {onCurrentLocationClick && (
        <CurrentLocationButton onClick={onCurrentLocationClick} disabled={loading || !!error} />
      )}
    </div>
  );
}

export const WeatherOverlay = memo(WeatherOverlayComponent);
