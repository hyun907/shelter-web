import { memo } from "react";
import styles from "./CurrentLocationButton.module.css";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

function CurrentLocationButtonComponent({ onClick, disabled = false }: Props) {
  return (
    <button type="button" className={styles.button} onClick={onClick} disabled={disabled}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z"
          fill="currentColor"
        />
      </svg>
      내 위치
    </button>
  );
}

export const CurrentLocationButton = memo(CurrentLocationButtonComponent);
