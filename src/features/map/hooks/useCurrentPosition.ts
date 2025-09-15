import { useCurrentPositionQuery, getPositionError } from "./useCurrentPositionQuery";

type PositionError = {
  type: "permission_denied" | "position_unavailable" | "timeout" | "not_supported" | "unknown";
  message: string;
};

export function useCurrentPosition() {
  const { data, error, isLoading, refetch } = useCurrentPositionQuery();

  const positionError = error ? getPositionError(error) : null;

  return {
    position: data?.position || null,
    accuracy: data?.accuracy || null,
    error: positionError,
    isLoading,
    retry: refetch
  };
}
