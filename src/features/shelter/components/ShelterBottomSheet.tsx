import { useNearbyShelters } from "../hooks/useNearbyShelters";
import { ShelterBottomSheetContent } from "./ShelterBottomSheetContent";

export function ShelterBottomSheet({ position }: { position: google.maps.LatLngLiteral }) {
  const { data: shelters, loading, error } = useNearbyShelters(position);

  if (loading) return <ShelterBottomSheetContent loading />;
  if (error) return <ShelterBottomSheetContent error={error} />;

  const items = Array.isArray(shelters)
    ? shelters.map((s, idx) => ({
        id: String(s.REARE_FCLT_NO || idx),
        name: s.REARE_NM,
        address: s.RONA_DADDR || s.DADDR,
        distanceMeter: s.distance
      }))
    : [];

  return <ShelterBottomSheetContent items={items} />;
}
