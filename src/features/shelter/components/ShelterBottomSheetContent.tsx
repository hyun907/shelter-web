import styles from "./shelter-bottom-sheet-content.module.css";

export type ShelterItem = {
  id: string;
  name: string; // 대피소명
  address: string; // 도로명 주소
  distanceMeter: number; // 거리(m)
};

export function ShelterBottomSheetContent({
  items,
  loading,
  error
}: {
  items?: ShelterItem[];
  loading?: boolean;
  error?: string | null;
}) {
  return (
    <div className={styles.list}>
      {loading && <div>불러오는 중...</div>}
      {error && !loading && <div style={{ color: "#ef4444" }}>오류: {error}</div>}
      {!loading && !error && items && items.length === 0 && <div>주변 대피소가 없습니다.</div>}
      {!loading &&
        !error &&
        items &&
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
