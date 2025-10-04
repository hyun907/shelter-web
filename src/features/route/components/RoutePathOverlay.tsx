import { Polyline, Marker } from "@react-google-maps/api";

type RoutePathOverlayProps = {
  routeData: {
    route?: {
      traoptimal?: {
        path: [number, number][];
      }[];
    };
  };
};

export function RoutePathOverlay({ routeData }: RoutePathOverlayProps) {
  const path = routeData?.route?.traoptimal?.[0]?.path;
  if (!path || path.length === 0) return null;

  return (
    <>
      <Polyline
        path={path.map(([lng, lat]) => ({ lat, lng }))}
        options={{ strokeColor: "#2a61d1ff", strokeWeight: 6 }}
      />
      <Marker
        position={{ lat: path[0][1], lng: path[0][0] }}
        label={{ text: "출발", color: "#fff", fontSize: "11px", fontWeight: "bold" }}
        icon={{
          url:
            "data:image/svg+xml;utf8," +
            encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="16" fill="#0844bdff" stroke="white" stroke-width="4"/>
              </svg>
            `),
          scaledSize: new window.google.maps.Size(40, 40)
        }}
      />
      <Marker
        position={{ lat: path[path.length - 1][1], lng: path[path.length - 1][0] }}
        label={{ text: "도착", color: "#fff", fontSize: "11px", fontWeight: "bold" }}
        icon={{
          url:
            "data:image/svg+xml;utf8," +
            encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="16" fill="#ff0000ff" stroke="white" stroke-width="4"/>
              </svg>
            `),
          scaledSize: new window.google.maps.Size(40, 40)
        }}
      />
    </>
  );
}
