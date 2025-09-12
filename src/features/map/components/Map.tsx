import { GoogleMap, Circle, useLoadScript } from "@react-google-maps/api";
import { useCurrentPosition } from "../hooks/useCurrentPosition";
import { useTodayWeather } from "../hooks/useTodayWeather";
import { WeatherOverlay } from ".";
import { useEffect, useRef } from "react";
import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";
import { ShelterBottomSheetContent } from "@/features/shelter";
import type { ShelterItem } from "@/features/shelter";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 }; // 서울 시청

export default function Map() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey ?? "" });

  const { position, accuracy } = useCurrentPosition();
  const { data: weather, loading, error } = useTodayWeather(position);

  const openedRef = useRef(false);
  const { open } = useBottomSheetStore();

  useEffect(() => {
    if (!openedRef.current && isLoaded) {
      const mockItems: ShelterItem[] = [
        {
          id: "1",
          name: "000 대피소",
          address: "000 대피소 도로명 주소 도로명 주소 도로명 주소 도로명",
          distanceMeter: 200,
          phone: "02-2019-2163"
        },
        {
          id: "2",
          name: "000 대피소",
          address: "000 대피소 도로명 주소 도로명 주소 도로명 주소 도로명",
          distanceMeter: 200,
          phone: "02-2019-2163"
        },
        {
          id: "3",
          name: "000 대피소",
          address: "000 대피소 도로명 주소 도로명 주소 도로명 주소 도로명",
          distanceMeter: 200,
          phone: "02-2019-2163"
        },
        {
          id: "4",
          name: "000 대피소",
          address: "000 대피소 도로명 주소 도로명 주소 도로명 주소 도로명",
          distanceMeter: 200,
          phone: "02-2019-2163"
        }
      ];
      open(<ShelterBottomSheetContent items={mockItems} />, { ariaLabel: "대피소 목록" });
      openedRef.current = true;
    }
  }, [isLoaded, open]);

  if (!apiKey || !isLoaded) return null;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={position ?? DEFAULT_CENTER}
      zoom={position ? 15 : 12}
      options={{ fullscreenControl: false, streetViewControl: false, mapTypeControl: false }}
    >
      {position && <WeatherOverlay weather={weather} loading={loading} error={error} />}

      {position && accuracy != null && (
        <Circle
          center={position}
          radius={accuracy}
          options={{
            fillColor: "#487fee9b",
            fillOpacity: 0.2,
            strokeColor: "#487fee9b",
            strokeOpacity: 0.4,
            strokeWeight: 1,
            clickable: false
          }}
        />
      )}
      {position && (
        <Circle
          center={position}
          radius={6}
          options={{
            fillColor: "#4880EE",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeOpacity: 1,
            strokeWeight: 3,
            clickable: false
          }}
        />
      )}
    </GoogleMap>
  );
}
