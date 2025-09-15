import { useQueryClient } from "@tanstack/react-query";

export function usePositionRefresh() {
  const queryClient = useQueryClient();

  const refreshPosition = () => {
    // 캐시를 무효화하여 새로운 위치 정보를 가져옴
    queryClient.invalidateQueries({ queryKey: ["currentPosition"] });
  };

  const clearPositionCache = () => {
    // 위치 정보 캐시를 완전히 제거
    queryClient.removeQueries({ queryKey: ["currentPosition"] });
  };

  return {
    refreshPosition,
    clearPositionCache
  };
}
