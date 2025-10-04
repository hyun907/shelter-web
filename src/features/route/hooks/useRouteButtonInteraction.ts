import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";
import { RouteContent } from "@/features/route/components/RouteContent";
import { createElement } from "react";
import type { RoutePathResponse } from "../types/route";

export function useRouteButtonInteraction(routeData: RoutePathResponse | null) {
  const content = useBottomSheetStore(state => state.content);
  const ariaLabel = useBottomSheetStore(state => state.ariaLabel);
  const translateY = useBottomSheetStore(state => state.translateY);
  const expandToTop = useBottomSheetStore(state => state.expandToTop);
  const collapseToBottom = useBottomSheetStore(state => state.collapseToBottom);
  const setContent = useBottomSheetStore(state => state.setContent);

  const handleRouteClick = () => {
    const isShowingRoute = ariaLabel === "경로 정보";

    if (!content || !isShowingRoute) {
      if (routeData) {
        setContent(createElement(RouteContent, { routeData }), "경로 정보");
        expandToTop?.();
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

  return { handleRouteClick };
}
