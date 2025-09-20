import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";
import { ShelterBottomSheetContent } from "@/features/shelter";
import type { NearbyShelterApiItem } from "@/features/shelter/schemas/shelter.schema";
import { createElement } from "react";

/**
 * 대피소 버튼 클릭 시 바텀시트 상태를 토글하는 로직을 제공하는 훅
 */
export function useShelterButtonInteraction(
  shelters: NearbyShelterApiItem[] | null,
  sheltersError: string | null
) {
  const isOpen = useBottomSheetStore(state => state.isOpen);
  const translateY = useBottomSheetStore(state => state.translateY);
  const expandToTop = useBottomSheetStore(state => state.expandToTop);
  const collapseToBottom = useBottomSheetStore(state => state.collapseToBottom);
  const open = useBottomSheetStore(state => state.open);

  const handleShelterClick = () => {
    if (!isOpen) {
      // 바텀시트가 닫혀있을 때는 열기
      if (sheltersError) {
        open(createElement(ShelterBottomSheetContent, { error: sheltersError }), {
          ariaLabel: "대피소 목록"
        });
      } else if (shelters && Array.isArray(shelters)) {
        const items = Array.isArray(shelters) ? shelters : [];
        open(createElement(ShelterBottomSheetContent, { items }), { ariaLabel: "대피소 목록" });
      } else {
        open(createElement(ShelterBottomSheetContent, { items: [] }), { ariaLabel: "대피소 목록" });
      }
      return;
    }

    // 바텀시트가 열려있을 때는 토글 동작
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
