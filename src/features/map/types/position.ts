export type PositionError = {
  type: "permission_denied" | "position_unavailable" | "timeout" | "not_supported" | "unknown";
  message: string;
};

export type PositionState = {
  position: google.maps.LatLngLiteral | null;
  accuracy: number | null;
  error: PositionError | null;
  isLoading: boolean;
};
