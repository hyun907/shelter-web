import { GoogleMap, Circle, useLoadScript } from "@react-google-maps/api";
import { useCurrentPosition } from "../hooks/useCurrentPosition";
import { useTodayWeather } from "../hooks/useTodayWeather";
import { useMapBottomSheet } from "../hooks/useMapBottomSheet";
import { WeatherOverlay } from ".";
import { PositionErrorModal } from "./PositionErrorModal";
import { PositionLoadingOverlay } from "./PositionLoadingOverlay";
import { useNearbyShelters } from "@/features/shelter";
import { useModalStore } from "@/common/hooks/useModalStore";
import { useEffect, useRef } from "react";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 }; // 서울 시청

export default function Map() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey ?? "" });

  const { position, accuracy, error: positionError, isLoading, retry } = useCurrentPosition();
  const { data: weather, loading, error } = useTodayWeather(position);

  const { data: shelters, error: sheltersError } = useNearbyShelters(position);
  const { open, close } = useModalStore();
  const lastErrorRef = useRef<string | null>(null);

  useMapBottomSheet(isLoaded, position, shelters, sheltersError);

  // 위치 에러 발생 시 모달 표시
  useEffect(() => {
    if (positionError && !isLoading) {
      const errorKey = `${positionError.type}-${positionError.message}`;

      // 같은 에러가 아니거나 처음 에러인 경우에만 모달 표시
      if (lastErrorRef.current !== errorKey) {
        lastErrorRef.current = errorKey;

        open(
          <PositionErrorModal
            error={positionError}
            onRetry={() => {
              retry();
              close();
            }}
            onClose={close}
          />,
          {
            ariaLabel: "위치 정보 오류",
            onBackdropClick: close
          }
        );
      }
    } else if (!positionError) {
      // 에러가 해결되면 상태 리셋
      lastErrorRef.current = null;
    }
  }, [positionError, isLoading, open, close, retry]);

  if (!apiKey || !isLoaded) return null;

  return (
    <>
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

      {isLoading && <PositionLoadingOverlay />}
    </>
  );
}
