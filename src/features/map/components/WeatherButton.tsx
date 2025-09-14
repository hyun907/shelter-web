import styles from "./WeatherOverlay.module.css";
import { getCurrentSeason } from "../utils/weather";
import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";

export type WeatherButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function WeatherButton({ label, disabled, onClick }: WeatherButtonProps) {
  const season = getCurrentSeason();
  const seasonClass = season === "summer" ? styles.buttonSummer : styles.buttonWinter;
  const isOpen = useBottomSheetStore(state => state.isOpen);
  const translateY = useBottomSheetStore(state => state.translateY);
  const expandToTop = useBottomSheetStore(state => state.expandToTop);
  const collapseToBottom = useBottomSheetStore(state => state.collapseToBottom);

  const handleShelterClick = () => {
    if (!isOpen) return;

    const isAtTop = translateY < 50;

    if (isAtTop && collapseToBottom) {
      collapseToBottom();
    } else if (!isAtTop && expandToTop) {
      expandToTop();
    }
  };

  return (
    <div className={`${styles.button} ${seasonClass}`}>
      <span
        className={styles.weatherInfo}
        onClick={onClick}
        style={{ cursor: disabled ? "default" : "pointer" }}
      >
        {label}
      </span>
      <button
        type="button"
        className={`${styles.shelterButton} ${season === "summer" ? styles.shelterButtonSummer : styles.shelterButtonWinter}`}
        onClick={handleShelterClick}
        disabled={disabled}
      >
        주변 쉼터 보기
      </button>
    </div>
  );
}
