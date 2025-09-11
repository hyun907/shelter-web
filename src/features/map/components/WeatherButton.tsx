import styles from "./WeatherOverlay.module.css";

export type WeatherButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function WeatherButton({ label, disabled, onClick }: WeatherButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      aria-expanded={false}
    >
      {label}
    </button>
  );
}
