import type { NearbyShelterApiItem } from "../schemas/shelter.schema";
import { ShelterListItem } from "./ShelterListItem";
import styles from "./shelter-bottom-sheet-content.module.css";

interface ShelterListProps {
  items: NearbyShelterApiItem[];
  onPress: (shelter: NearbyShelterApiItem) => void;
  error?: string | null;
}

export function ShelterList({ items, onPress, error }: ShelterListProps) {
  return (
    <div className={styles.list}>
      {error && <div style={{ color: "#ef4444" }}>오류: {error}</div>}
      {items.map((item, index) => (
        <div
          key={`${item.RSTR_NM}-${item.RN_DTL_ADRES || item.DTL_ADRES}-${index}`}
          data-shelter-index={index}
        >
          <ShelterListItem item={item} onPress={onPress} />
        </div>
      ))}
    </div>
  );
}
