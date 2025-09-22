import styles from "./shelter-bottom-sheet-content.module.css";
import { useNavigate } from "react-router-dom";
import type { NearbyShelterApiItem } from "../schemas/shelter.schema";
import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";

export type ShelterItem = NearbyShelterApiItem;

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
        items.map((item, index) => (
          <button
            key={`${item.RSTR_NM}-${item.RN_DTL_ADRES || item.DTL_ADRES}-${index}`}
            className={styles.card}
            onClick={() => handlePress(item)}
          >
            <div className={styles.title}>{item.RSTR_NM || "이름 없음"}</div>
            <div className={styles.address}>
              {item.RN_DTL_ADRES || item.DTL_ADRES || "주소 없음"}
            </div>
            <div className={styles.meta}>
              <span className={styles.distance}>{item.distance}km</span>
            </div>
          </button>
        ))}
    </div>
  );
}
