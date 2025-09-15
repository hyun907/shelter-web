type PositionError = {
  type: "permission_denied" | "position_unavailable" | "timeout" | "not_supported" | "unknown";
  message: string;
};

export const getErrorIcon = (errorType: PositionError["type"]): string => {
  switch (errorType) {
    case "permission_denied":
      return "🔒";
    case "position_unavailable":
      return "📡";
    case "timeout":
      return "⏱️";
    case "not_supported":
      return "❌";
    default:
      return "⚠️";
  }
};

export const getActionText = (errorType: PositionError["type"]): string => {
  switch (errorType) {
    case "permission_denied":
      return "설정에서 권한 허용";
    case "timeout":
      return "다시 시도";
    default:
      return "다시 시도";
  }
};

export const getPermissionGuideMessage = (): string => {
  return "브라우저 설정에서 위치 권한을 허용해주세요.\n\nChrome: 설정 > 개인정보 보호 및 보안 > 사이트 설정 > 위치\nSafari: Safari > 환경설정 > 웹사이트 > 위치";
};

export const shouldShowPermissionGuide = (errorType: PositionError["type"]): boolean => {
  return errorType === "permission_denied";
};
