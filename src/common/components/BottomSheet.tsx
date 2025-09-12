import { createPortal } from "react-dom";
import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";
import { useEffect } from "react";
import styles from "./bottom-sheet.module.css";

export function BottomSheet() {
  const { isOpen, content, close, options } = useBottomSheetStore();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (options?.onBackdropClick) options.onBackdropClick();
    else close();
  };

  const root = document.getElementById("modal-root") ?? document.body;

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div
        className={styles.sheetWrapper}
        onClick={e => e.stopPropagation()}
        aria-label={options?.ariaLabel}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.handle} />
        <div className={styles.content}>{content}</div>
      </div>
    </div>,
    root
  );
}
