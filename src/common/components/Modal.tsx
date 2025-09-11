import { createPortal } from "react-dom";
import { useModalStore } from "@/common/hooks/useModalStore";
import { useEffect, useRef } from "react";
import styles from "./modal.module.css";

export function Modal() {
  const { isOpen, content, close, options } = useModalStore();
  const backdropRef = useRef<HTMLDivElement>(null);

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
    <div ref={backdropRef} className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.wrapper}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label={options?.ariaLabel}
          className={styles.modal}
          onClick={e => e.stopPropagation()}
        >
          {content}
        </div>
      </div>
    </div>,
    root
  );
}
