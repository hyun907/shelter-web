import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";

/**
 * 대피소 버튼 클릭 시 바텀시트 상태를 토글하는 로직을 제공하는 훅
 */
export function useShelterButtonInteraction() {
  const isOpen = useBottomSheetStore(state => state.isOpen);
  const translateY = useBottomSheetStore(state => state.translateY);
  const expandToTop = useBottomSheetStore(state => state.expandToTop);
  const collapseToBottom = useBottomSheetStore(state => state.collapseToBottom);

  const handleShelterClick = () => {
    if (!isOpen) return;

    const isAtTop = translateY < 50;

    if (isAtTop && collapseToBottom) {
      collapseToBottom();
    } else if (!isAtTop && expandToTop) {
      expandToTop();
    }
  };

  return {
    handleShelterClick
  };
}
