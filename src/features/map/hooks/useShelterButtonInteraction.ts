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
  const openAndExpand = useBottomSheetStore(state => state.openAndExpand);
  const setTranslateY = useBottomSheetStore(state => state.setTranslateY);

  const handleShelterClick = () => {
    if (!isOpen) {
      if (sheltersError) {
        openAndExpand(createElement(ShelterBottomSheetContent, { error: sheltersError }), {
          ariaLabel: "대피소 목록"
        });
      } else if (shelters && Array.isArray(shelters)) {
        const items = Array.isArray(shelters) ? shelters : [];
        openAndExpand(createElement(ShelterBottomSheetContent, { items }), {
          ariaLabel: "대피소 목록"
        });
      } else {
        openAndExpand(createElement(ShelterBottomSheetContent, { items: [] }), {
          ariaLabel: "대피소 목록"
        });
      }

      // 확실하게 translateY를 0으로 설정
      setTimeout(() => {
        setTranslateY(0);
      }, 50);
      return;
    }

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
