import styles from "./shelter-bottom-sheet-content.module.css";

export type ShelterItem = {
  id: string;
  name: string; // 대피소명
  address: string; // 도로명 주소
  distanceMeter: number; // 거리(m)
  phone: string; // 연락처
};

export function ShelterBottomSheetContent({ items }: { items: ShelterItem[] }) {
  return (
    <div className={styles.list}>
      {items.map(item => (
        <div key={item.id} className={styles.card}>
          <div className={styles.title}>{item.name}</div>
          <div className={styles.address}>{item.address}</div>
          <div className={styles.meta}>
            <span className={styles.distance}>{item.distanceMeter}m</span>
            <span className={styles.separator}>|</span>
            <span className={styles.phone}>{item.phone}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
