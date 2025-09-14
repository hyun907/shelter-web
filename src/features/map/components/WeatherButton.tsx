import styles from "./WeatherOverlay.module.css";
import { getCurrentSeason } from "../utils/weather";

export type WeatherButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function WeatherButton({ label, disabled, onClick }: WeatherButtonProps) {
  const season = getCurrentSeason();
  const seasonClass = season === "summer" ? styles.buttonSummer : styles.buttonWinter;

  return (
    <button
      type="button"
      className={`${styles.button} ${seasonClass}`}
      disabled={disabled}
      onClick={onClick}
      aria-expanded={false}
    >
      {label}
    </button>
  );
}
