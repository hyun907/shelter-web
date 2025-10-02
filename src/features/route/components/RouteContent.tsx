import type { RoutePathResponse, RouteGuide } from "../types/route";
import styles from "./RouteContent.module.css";
import { formatDurationFromMs } from "../utils/formatDuration";
import { useSearchParams } from "react-router-dom";
import { calculateRoute } from "../utils/calculateRoute";

interface RouteBottomSheetContentProps {
  routeData: RoutePathResponse;
}

export function RouteContent({ routeData }: RouteBottomSheetContentProps) {
  const [params] = useSearchParams();

  if (!routeData) return <div style={{ backgroundColor: "red" }}>경로 정보가 없습니다.</div>;

  const route: RouteGuide[] = routeData.route?.traoptimal?.[0]?.guide ?? [];
  console.log(route);
  const shelterParam = params.get("shelter");

  const { totalDistance, totalDurationCentisec } = calculateRoute(route);

  return (
    <div className={styles.content}>
      <div className={styles.summary}>
        <p className={styles.total}>
          총 <span className={styles.highlight}>{formatDurationFromMs(totalDurationCentisec)}</span>{" "}
          소요 <span>|</span> {totalDistance / 1000}km
        </p>
        <p className={styles.type}>🚘 차량</p>
      </div>

      <div className={styles.sectionTitle}>{shelterParam} 출발</div>

      <ul className={styles.list}>
        {route.map((step, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.instruction}>{step.instructions}</span>
            <div className={styles.meta}>
              <span className={styles.distance}>{step.distance}m 이동 |</span>
              <span className={styles.duration}>{formatDurationFromMs(step.duration)}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.sectionTitle}>도착</div>
    </div>
  );
}
