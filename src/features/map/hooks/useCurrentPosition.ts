import { useEffect, useState } from "react";
import { toLatLng, toAccuracy } from "../schemas/geo.schema";
import { getCurrentPositionOnce } from "../services/geolocation";

export function useCurrentPosition() {
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    getCurrentPositionOnce({ enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 })
      .then(({ coords }) => {
        if (!mounted) return;
        const pos = toLatLng({ lat: coords.latitude, lng: coords.longitude });
        const acc = toAccuracy(coords.accuracy);
        setPosition(pos);
        setAccuracy(acc);
      })
      .catch(() => {
        // 권한 거부/오류 처리
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { position, accuracy };
}
