import { useQuery } from "@tanstack/react-query";
import { getCurrentPositionOnce } from "../services/geolocation";
import { toLatLng, toAccuracy } from "../schemas/geo.schema";

type PositionError = {
  type: "permission_denied" | "position_unavailable" | "timeout" | "not_supported" | "unknown";
  message: string;
};

const getCurrentPosition = async () => {
  const { coords } = await getCurrentPositionOnce({
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 5000
  });

  return {
    position: toLatLng({ lat: coords.latitude, lng: coords.longitude }),
    accuracy: toAccuracy(coords.accuracy)
  };
};

export function useCurrentPositionQuery() {
  return useQuery({
    queryKey: ["currentPosition"],
    queryFn: getCurrentPosition,
    retry: (failureCount, error) => {
      // 권한 거부나 지원하지 않는 경우는 재시도하지 않음
      if (error instanceof GeolocationPositionError) {
        if (error.code === error.PERMISSION_DENIED || error.code === 0) {
          return false;
        }
        // 다른 에러는 최대 2번 재시도
        return failureCount < 2;
      }
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 2 * 60 * 1000, // 2분간 fresh (더 자주 업데이트)
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    refetchOnWindowFocus: true, // 윈도우 포커스 시 재요청 (사용자가 앱으로 돌아왔을 때)
    refetchOnMount: true, // 컴포넌트 마운트 시 재요청
    refetchInterval: 5 * 60 * 1000, // 5분마다 자동 재요청
    refetchIntervalInBackground: false // 백그라운드에서는 자동 재요청 안함
  });
}

// 에러를 PositionError 타입으로 변환하는 헬퍼 함수
export function getPositionError(error: unknown): PositionError | null {
  if (error instanceof GeolocationPositionError) {
    let errorType: PositionError["type"];
    let message: string;

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorType = "permission_denied";
        message = "위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorType = "position_unavailable";
        message = "위치 정보를 가져올 수 없습니다. GPS 신호를 확인해주세요.";
        break;
      case error.TIMEOUT:
        errorType = "timeout";
        message = "위치 조회 시간이 초과되었습니다. 다시 시도해주세요.";
        break;
      default:
        errorType = "unknown";
        message = "알 수 없는 오류가 발생했습니다.";
    }

    return { type: errorType, message };
  }

  return null;
}
