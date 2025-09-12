import styles from "./shelter-bottom-sheet-content.module.css";

export type ShelterItem = {
  id: string;
  name: string; // 대피소명
  address: string; // 도로명 주소
  distanceMeter: number; // 거리(m)
};

export function ShelterBottomSheetContent({
  items,
  error
}: {
  items?: ShelterItem[];
  error?: string | null;
}) {
  return (
    <div className={styles.list}>
      {error && <div style={{ color: "#ef4444" }}>오류: {error}</div>}
      {items &&
        items.map(item => (
          <div key={item.id} className={styles.card}>
            <div className={styles.title}>{item.name}</div>
            <div className={styles.address}>{item.address}</div>
            <div className={styles.meta}>
              <span className={styles.distance}>{item.distanceMeter}m</span>
            </div>
          </div>
        ))}
    </div>
  );
}
