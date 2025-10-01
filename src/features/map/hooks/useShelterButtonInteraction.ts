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
  const content = useBottomSheetStore(state => state.content);
  const translateY = useBottomSheetStore(state => state.translateY);
  const expandToTop = useBottomSheetStore(state => state.expandToTop);
  const collapseToBottom = useBottomSheetStore(state => state.collapseToBottom);
  const setContent = useBottomSheetStore(state => state.setContent);

  const handleShelterClick = () => {
    if (!content) {
      if (sheltersError) {
        setContent(
          createElement(ShelterBottomSheetContent, { error: sheltersError }),
          "대피소 목록"
        );
      } else if (shelters && Array.isArray(shelters)) {
        const items = Array.isArray(shelters) ? shelters : [];
        setContent(createElement(ShelterBottomSheetContent, { items }), "대피소 목록");
      } else {
        setContent(createElement(ShelterBottomSheetContent, { items: [] }), "대피소 목록");
      }

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
