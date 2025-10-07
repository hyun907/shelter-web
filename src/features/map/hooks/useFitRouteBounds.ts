import { useEffect } from "react";

type RouteData = {
  route?: {
    traoptimal?: {
      path?: [number, number][];
    }[];
  };
};

export function useFitRouteBounds(map: google.maps.Map | null, routeData?: RouteData) {
  useEffect(() => {
    if (!map || !routeData?.route?.traoptimal?.[0]?.path) return;

    const path = routeData.route.traoptimal[0].path!;
    if (!path.length) return;

    const bounds = new google.maps.LatLngBounds();

    path.forEach(([lng, lat]) => {
      bounds.extend({ lat, lng });
    });

    map.fitBounds(bounds, { top: 80, right: 80, bottom: 80, left: 80 });
  }, [map, routeData]);
}
