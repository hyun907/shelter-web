import type { NearbyShelterApiItem } from "../schemas/shelter.schema";
import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";
import { useShelterList } from "../hooks/useShelterList";
import { ShelterList } from "./ShelterList";

export type ShelterItem = NearbyShelterApiItem;

export function ShelterBottomSheetContent({
  items,
  error
}: {
  items?: NearbyShelterApiItem[];
  error?: string | null;
}) {
  useBottomSheetStore();
  const { visibleItems, handlePress } = useShelterList(items);

  return <ShelterList items={visibleItems} onPress={handlePress} error={error} />;
}
