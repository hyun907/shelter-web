import styles from "./PositionLoadingOverlay.module.css";

export function PositionLoadingOverlay() {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.spinner}></div>
        <p className={styles.message}>위치 정보를 가져오는 중...</p>
      </div>
    </div>
  );
}
