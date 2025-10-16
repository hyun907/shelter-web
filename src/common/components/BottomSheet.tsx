import { createPortal } from "react-dom";
import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";
import { useEffect } from "react";
import { useBottomSheetInteraction } from "@/common/hooks/useBottomSheetInteraction";
import { BottomSheetView } from "@/common/components/BottomSheetView";
import { useLocation } from "react-router-dom";

const PEEK_HEIGHT = 56;

export function BottomSheet() {
  const { content, ariaLabel } = useBottomSheetStore();
  const location = useLocation();

  const interaction = useBottomSheetInteraction(PEEK_HEIGHT);

  // 라우트 변경 시 바텀시트 초기화
  useEffect(() => {
    useBottomSheetStore.setState({
      content: null,
      ariaLabel: null,
      expandToTop: null,
      collapseToBottom: null
    });
  }, [location.pathname]);

  // 드래그하거나 스냅(snap)할 수 있는지를 결정
  useEffect(() => {
    if (content) {
      useBottomSheetStore.setState({
        expandToTop: interaction.expandToTop,
        collapseToBottom: interaction.collapseToBottom
      });
    } else {
      useBottomSheetStore.setState({
        expandToTop: null,
        collapseToBottom: null
      });
    }
  }, [content, interaction.expandToTop, interaction.collapseToBottom]);

  // 바텀 시트 위치 값을 전파하여 버튼 토글 로직에서 사용할 수 있도록만 동기화
  useEffect(() => {
    if (content) {
      useBottomSheetStore.setState({ translateY: interaction.translateY });
    }
  }, [content, interaction.translateY]);

  const root = document.getElementById("bottom-sheet-root") ?? document.body;

  return createPortal(
    <BottomSheetView
      translateY={interaction.translateY}
      isDragging={interaction.isDragging}
      isAnimating={interaction.isAnimating}
      measured={interaction.measured}
      sheetRef={interaction.sheetRef}
      handleRef={interaction.handleRef}
      onPointerDown={interaction.onPointerDown}
      onPointerMove={interaction.onPointerMove}
      onPointerUp={interaction.onPointerUp}
      onPointerCancel={interaction.onPointerCancel}
      ariaLabel={ariaLabel ?? undefined}
    >
      {content}
    </BottomSheetView>,
    root
  );
}
