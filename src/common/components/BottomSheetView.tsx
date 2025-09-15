import styles from "./bottom-sheet.module.css";

export type BottomSheetViewProps = {
  translateY: number;
  isDragging: boolean;
  isAnimating: boolean;
  measured: boolean;
  sheetRef: React.RefObject<HTMLDivElement>;
  handleRef: React.RefObject<HTMLDivElement>;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onBackdropClick: () => void;
  ariaLabel?: string;
  children?: React.ReactNode;
};

export function BottomSheetView(props: BottomSheetViewProps) {
  const {
    translateY,
    isDragging,
    isAnimating,
    measured,
    sheetRef,
    handleRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onBackdropClick,
    ariaLabel,
    children
  } = props;

  return (
    <div className={styles.backdrop} onClick={onBackdropClick}>
      <div
        ref={sheetRef}
        className={`${styles.sheetWrapper} ${isDragging ? styles.dragging : ""} ${!measured ? styles.noTransition : ""}`}
        style={{ transform: `translateY(${translateY}px)` }}
        onClick={e => e.stopPropagation()}
        aria-label={ariaLabel}
        role="dialog"
        aria-modal="true"
      >
        <div
          ref={handleRef}
          className={styles.handle}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
        />
        <div className={styles.peekSpacer} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
