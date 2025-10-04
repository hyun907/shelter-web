import styles from "./WeatherOverlay.module.css";
import { getCurrentSeason } from "../utils/weather";
import { WeatherIcon } from "./WeatherIcon";
import { useShelterButtonInteraction } from "../hooks/useShelterButtonInteraction";
import type { TodayWeatherResponse } from "../schemas/weather.schema";
import type { NearbyShelterApiItem } from "@/features/shelter/schemas/shelter.schema";
import { useNavigate } from "react-router-dom";

export type WeatherButtonProps = {
  label: string;
  weather?: TodayWeatherResponse | null;
  disabled?: boolean;
  onClick?: () => void;
  shelters?: NearbyShelterApiItem[] | null;
  sheltersError?: string | null;
};

export function WeatherButton({
  label,
  weather,
  disabled,
  onClick,
  shelters,
  sheltersError
}: WeatherButtonProps) {
  const season = getCurrentSeason();
  const seasonClass = season === "summer" ? styles.buttonSummer : styles.buttonWinter;
  const { handleShelterClick } = useShelterButtonInteraction(
    shelters ?? null,
    sheltersError ?? null
  );
  const navigate = useNavigate();

  return (
    <div className={`${styles.button} ${seasonClass}`}>
      <span
        className={styles.weatherInfo}
        onClick={onClick}
        style={{ cursor: disabled ? "default" : "pointer" }}
      >
        {weather && (
          <WeatherIcon sky={weather.sky} pty={weather.pty} style={{ marginRight: "8px" }} />
        )}
        {label}
      </span>
      <button
        type="button"
        className={`${styles.shelterButton} ${season === "summer" ? styles.shelterButtonSummer : styles.shelterButtonWinter}`}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          navigate("/map", { state: { openShelterSheet: true }, replace: true });
          handleShelterClick();
        }}
        onTouchEnd={e => {
          e.preventDefault();
          e.stopPropagation();
          navigate("/map", { state: { openShelterSheet: true }, replace: true });
          handleShelterClick();
        }}
        disabled={false}
        style={{ minHeight: "44px", minWidth: "120px" }}
      >
        주변 쉼터 보기
      </button>
    </div>
  );
}
