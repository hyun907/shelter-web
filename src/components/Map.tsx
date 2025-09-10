import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import styles from "./Map.module.css";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };

function Map() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey ?? ""
  });

  if (!apiKey || !isLoaded) return null;

  return (
    <GoogleMap
      id="main-map"
      mapContainerClassName={styles.container}
      center={DEFAULT_CENTER}
      zoom={12}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false
      }}
    />
  );
}

export default Map;
