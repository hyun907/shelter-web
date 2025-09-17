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
  const { open } = useBottomSheetStore();
  const openedOnceRef = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (!position && !openedOnceRef.current) {
      open(<ShelterBottomSheetContent items={[]} />, { ariaLabel: "대피소 목록" });
      openedOnceRef.current = true;
      return;
    }

    if (sheltersError) {
      open(<ShelterBottomSheetContent error={sheltersError} />, { ariaLabel: "대피소 목록" });
      openedOnceRef.current = true;
      return;
    }

    if (shelters && Array.isArray(shelters)) {
      const items = Array.isArray(shelters) ? shelters : [];
      open(<ShelterBottomSheetContent items={items} />, { ariaLabel: "대피소 목록" });
      openedOnceRef.current = true;
    }
  }, [isLoaded, position, shelters, sheltersError, open]);

  return {
    openedOnceRef
  };
}
