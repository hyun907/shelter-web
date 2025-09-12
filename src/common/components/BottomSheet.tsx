import { createPortal } from "react-dom";
import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";
import { useEffect } from "react";
import { useBottomSheetInteraction } from "@/common/hooks/useBottomSheetInteraction";
import { BottomSheetView } from "@/common/components/BottomSheetView";

const PEEK_HEIGHT = 56;

export function BottomSheet() {
  const { isOpen, content, close, options } = useBottomSheetStore();

  const interaction = useBottomSheetInteraction(PEEK_HEIGHT);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const root = document.getElementById("modal-root") ?? document.body;

  return createPortal(
    <BottomSheetView
      translateY={interaction.translateY}
      isDragging={interaction.isDragging}
      measured={interaction.measured}
      sheetRef={interaction.sheetRef}
      handleRef={interaction.handleRef}
      onPointerDown={interaction.onPointerDown}
      onPointerMove={interaction.onPointerMove}
      onPointerUp={interaction.onPointerUp}
      onTouchStart={interaction.onTouchStart}
      onTouchMove={interaction.onTouchMove}
      onTouchEnd={interaction.onTouchEnd}
      onBackdropClick={() => (options?.onBackdropClick ? options.onBackdropClick() : close())}
      ariaLabel={options?.ariaLabel}
    >
      {content}
    </BottomSheetView>,
    root
  );
}
