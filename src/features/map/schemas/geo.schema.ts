export function toLatLng(input: { lat: number; lng: number }): google.maps.LatLngLiteral {
  const { lat, lng } = input;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw new Error("Invalid coordinates");
  }
  return { lat, lng };
}

export function toAccuracy(acc: number | null | undefined): number | null {
  return Number.isFinite(acc as number) && (acc as number) >= 0 ? (acc as number) : null;
}
