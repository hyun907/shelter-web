import { useNearbyShelters } from "../hooks/useNearbyShelters";
import { ShelterBottomSheetContent } from "./ShelterBottomSheetContent";

export function ShelterBottomSheet({ position }: { position: google.maps.LatLngLiteral }) {
  const { data: shelters, error } = useNearbyShelters(position);

  if (error) return <ShelterBottomSheetContent error={error} />;

  const items = Array.isArray(shelters) ? shelters : [];
  return <ShelterBottomSheetContent items={items} />;
}
