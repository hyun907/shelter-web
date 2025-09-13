export type TodayWeatherResponse = {
  baseDate: string;
  baseTime: string;
  fcstTime: string;
  locationName: string;
  nx: number;
  ny: number;
  tmp: string;
  uuu: string;
  vvv: string;
  vec: string;
  wsd: string;
  sky: string;
  pty: string;
  pop: string;
  wav: string;
  pcp: string;
};

export function isTodayWeatherResponse(input: unknown): input is TodayWeatherResponse {
  if (typeof input !== "object" || input === null) return false;
  const obj = input as Record<string, unknown>;
  const requiredStringFields = [
    "baseDate",
    "baseTime",
    "fcstTime",
    "locationName",
    "tmp",
    "uuu",
    "vvv",
    "vec",
    "wsd",
    "sky",
    "pty",
    "pop",
    "wav",
    "pcp"
  ];
  for (const key of requiredStringFields) {
    if (typeof obj[key] !== "string") return false;
  }
  if (typeof obj["nx"] !== "number" || typeof obj["ny"] !== "number") return false;
  return true;
}

export function toTodayWeatherResponse(input: unknown): TodayWeatherResponse {
  if (!isTodayWeatherResponse(input)) {
    throw new Error("Invalid TodayWeatherResponse payload");
  }
  return input;
}
