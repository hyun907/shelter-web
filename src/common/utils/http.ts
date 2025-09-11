import { isAxiosError } from "axios";

export function extractAxiosErrorMessage(err: unknown) {
  if (isAxiosError(err)) {
    const status = err.response?.status;
    const data = err.response?.data as unknown;
    let serverMsg: string | undefined;
    if (typeof data === "object" && data !== null && "message" in data) {
      const maybe = (data as { message?: unknown }).message;
      if (typeof maybe === "string") serverMsg = maybe;
    }
    const msg = serverMsg || err.message || "요청에 실패했습니다";
    return status ? `API ${status}: ${msg}` : msg;
  }

  if (err && typeof err === "object" && "message" in err) {
    const maybe = (err as { message?: unknown }).message;
    return typeof maybe === "string" ? maybe : "알 수 없는 오류";
  }

  return String(err);
}
