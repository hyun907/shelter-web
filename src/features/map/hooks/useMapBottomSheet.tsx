import { useEffect, useRef } from "react";
import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";
import { ShelterBottomSheetContent } from "@/features/shelter";
import type { NearbyShelterApiItem } from "@/features/shelter/schemas/shelter.schema";

/**
 * 지도에서 바텀시트를 관리하는 로직을 제공하는 훅
 */
export function useMapBottomSheet(
  isLoaded: boolean,
  position: google.maps.LatLngLiteral | null,
  shelters: NearbyShelterApiItem[] | null,
  sheltersError: string | null
) {
  const { setContent } = useBottomSheetStore();
  const openedOnceRef = useRef(false);

  // 초기 진입 시, 지도 로드 여부와 무관하게 한 번 비어있는 리스트를 노출
  useEffect(() => {
    if (!openedOnceRef.current && !position) {
      setContent(<ShelterBottomSheetContent items={[]} />, "대피소 목록");
      openedOnceRef.current = true;
    }
  }, []);

  // 지도 로드 이후 데이터/에러에 따라 내용 업데이트
  useEffect(() => {
    if (!isLoaded) return;

    if (sheltersError) {
      setContent(<ShelterBottomSheetContent error={sheltersError} />, "대피소 목록");
      openedOnceRef.current = true;
      return;
    }

    if (shelters && Array.isArray(shelters)) {
      const items = Array.isArray(shelters) ? shelters : [];
      setContent(<ShelterBottomSheetContent items={items} />, "대피소 목록");
      openedOnceRef.current = true;
    }
  }, [isLoaded, shelters, sheltersError, setContent]);

  return {
    openedOnceRef
  };
}
