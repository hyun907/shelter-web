import styles from "./RouteButton.module.css";
import { useRouteButtonInteraction } from "../hooks/useRouteButtonInteraction";
import type { RoutePathResponse } from "../types/route";
import { RiRouteLine } from "react-icons/ri";

type RouteButtonProps = {
  routeData: RoutePathResponse | null;
};

export function RouteButton({ routeData }: RouteButtonProps) {
  const { handleRouteClick } = useRouteButtonInteraction(routeData);

  return (
    <button
      type="button"
      className={styles.routeButton}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        handleRouteClick();
      }}
    >
      <RiRouteLine className={styles.icon} />
      <span className={styles.text}>경로</span>
    </button>
  );
}
