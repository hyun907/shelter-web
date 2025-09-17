import { useCurrentPositionQuery, getPositionError } from "./useCurrentPositionQuery";

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
