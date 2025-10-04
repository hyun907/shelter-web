import { GoogleMap, Circle, useLoadScript } from "@react-google-maps/api";
import { useCurrentPosition } from "../hooks/useCurrentPosition";
import { useTodayWeather } from "../hooks/useTodayWeather";
import { useMapBottomSheet } from "../hooks/useMapBottomSheet";
import { WeatherOverlay } from ".";
import { PositionErrorModal } from "./PositionErrorModal";
import { useNearbyShelters } from "@/features/shelter";
import { useModalStore } from "@/common/hooks/useModalStore";
import { useEffect, useRef, useState } from "react";
import { BottomSheet } from "@/common/components/BottomSheet";
import { useRoutePath } from "@/features/route/services/useRoutePath";
import { RoutePathOverlay } from "@/features/route/components/RoutePathOverlay";
import { useFitRouteBounds } from "../hooks/useFitRouteBounds";
import { useBottomSheetStore } from "@/common/hooks/useBottomSheetStore";
import { RouteContent } from "@/features/route/components/RouteContent";
import { useSearchParams } from "react-router-dom";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 }; // 서울 시청

export default function Map() {
  const [params] = useSearchParams();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey ?? "" });
  const { open, close } = useModalStore();
  const { setContent } = useBottomSheetStore();

  const { position, accuracy, error: positionError, isLoading, retry } = useCurrentPosition();

  const { data: weather, loading, error } = useTodayWeather(position);
  const { data: shelters, error: sheltersError } = useNearbyShelters(position);

  const lastErrorRef = useRef<string | null>(null);

  // 목적지 불러오기
  const destLat = parseFloat(params.get("destLat") ?? "");
  const destLng = parseFloat(params.get("destLng") ?? "");
  const hasDestination = !isNaN(destLat) && !isNaN(destLng) && destLat !== 0 && destLng !== 0;

  // 목적지가 있을 때만 경로 조회
  const { data: routeData } = useRoutePath(
    position && hasDestination
      ? {
          startLat: position.lat,
          startLot: position.lng,
          goalLat: destLat,
          goalLot: destLng
        }
      : { startLat: 0, startLot: 0, goalLat: 0, goalLot: 0 }
  );

  useMapBottomSheet(isLoaded, position, shelters, sheltersError);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [shouldShowRoute, setShouldShowRoute] = useState(false);

  // 경로가 있을 때만 bounds 맞추기
  useFitRouteBounds(map, hasDestination ? routeData : undefined);

  // 목적지 변경 감지
  useEffect(() => {
    if (hasDestination && routeData?.route?.traoptimal?.[0]?.path?.length) {
      setShouldShowRoute(true);
      setContent(<RouteContent routeData={routeData} />, "경로 정보");
    } else {
      setShouldShowRoute(false);
    }
  }, [routeData, hasDestination, setContent]);

  // 위치 에러 발생 시 모달 표시
  useEffect(() => {
    if (positionError && !isLoading) {
      const errorKey = `${positionError.type}-${positionError.message}`;
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
          { ariaLabel: "위치 정보 오류" }
        );
      }
    } else if (!positionError) {
      // 에러가 해결되면 상태 리셋
      lastErrorRef.current = null;
    }
  }, [positionError, isLoading, open, close, retry]);

  if (!apiKey) return null;

  return (
    <>
      {isLoaded && (
        <GoogleMap
          key={hasDestination ? `with-route-${destLat}-${destLng}` : "no-route"}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position ?? DEFAULT_CENTER}
          zoom={position ? 15 : 12}
          options={{ fullscreenControl: false, streetViewControl: false, mapTypeControl: false }}
          onLoad={mapInstance => setMap(mapInstance)}
        >
          {shouldShowRoute && routeData?.route?.traoptimal?.[0]?.path && (
            <RoutePathOverlay key={`route-${destLat}-${destLng}`} routeData={routeData} />
          )}

          {position && (
            <WeatherOverlay
              weather={weather}
              loading={loading}
              error={error}
              shelters={shelters}
              sheltersError={sheltersError}
            />
          )}

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
      )}
      {/* {isLoading && <PositionLoadingOverlay />} */}
      <BottomSheet />
    </>
  );
}
