import styles from "./shelter-bottom-sheet-content.module.css";
import { useNavigate } from "react-router-dom";
import type { NearbyShelterApiItem } from "../schemas/shelter.schema";
import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";

// export type ShelterItem = {
//   id: string;
//   name: string; // 대피소명
//   address: string; // 도로명 주소
//   distanceMeter: number; // 거리(m)
// };

export function ShelterBottomSheetContent({
  items,
  error
}: {
  items?: NearbyShelterApiItem[];
  error?: string | null;
}) {
  const navigate = useNavigate();
  const { close } = useBottomSheetStore();
  const handlePress = (shelter: NearbyShelterApiItem) => {
    close();
    const query = encodeURIComponent(JSON.stringify(shelter));
    navigate(`/detail?shelter=${query}`);
  };

  return (
    <div className={styles.list}>
      {error && <div style={{ color: "#ef4444" }}>오류: {error}</div>}
      {items &&
        items.map(item => (
          <button key={item.REARE_NM} className={styles.card} onClick={() => handlePress(item)}>
            <div className={styles.title}>{item.REARE_NM}</div>
            <div className={styles.address}>{item.RONA_DADDR || item.DADDR}</div>
            <div className={styles.meta}>
              <span className={styles.distance}>{item.distance}m</span>
            </div>
          </button>
        ))}
    </div>
  );
}
