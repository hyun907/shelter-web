import { useCallback } from "react";
import type { Position } from "../types/position";

export function useCurrentLocationNavigation(
  map: google.maps.Map | null,
  position: Position | null
) {
  const navigateToCurrentLocation = useCallback(() => {
    if (!map || !position) {
      return;
    }

    // 현재 위치로 지도 중심 이동
    map.panTo({
      lat: position.lat,
      lng: position.lng
    });

    // 적절한 줌 레벨로 설정 (15는 상세한 지도 뷰)
    map.setZoom(15);
  }, [map, position]);

  return {
    navigateToCurrentLocation
  };
}
