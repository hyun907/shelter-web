import { usePositionRefresh } from "./usePositionRefresh";

type PositionError = {
  type: "permission_denied" | "position_unavailable" | "timeout" | "not_supported" | "unknown";
  message: string;
};

export function usePositionErrorActions() {
  const { refreshPosition } = usePositionRefresh();

  const handleErrorAction = (error: PositionError, onRetry: () => void) => {
    if (error.type === "permission_denied") {
      // 권한 거부 시 사용자 안내
      alert(
        "브라우저 설정에서 위치 권한을 허용해주세요.\n\nChrome: 설정 > 개인정보 보호 및 보안 > 사이트 설정 > 위치\nSafari: Safari > 환경설정 > 웹사이트 > 위치"
      );
    } else {
      // 다른 에러 시 재시도
      refreshPosition();
      onRetry();
    }
  };

  return {
    handleErrorAction
  };
}
