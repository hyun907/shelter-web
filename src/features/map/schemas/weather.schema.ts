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
  if (typeof input !== "object" || input === null) {
    console.log("날씨 스키마 검증 실패: input이 객체가 아님", typeof input, input);
    return false;
  }
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
    if (typeof obj[key] !== "string") {
      console.log(`날씨 스키마 검증 실패: ${key} 필드가 문자열이 아님`, typeof obj[key], obj[key]);
      return false;
    }
  }
  if (typeof obj["nx"] !== "number" || typeof obj["ny"] !== "number") {
    console.log(
      "날씨 스키마 검증 실패: nx 또는 ny가 숫자가 아님",
      typeof obj["nx"],
      typeof obj["ny"]
    );
    return false;
  }
  return true;
}

export function toTodayWeatherResponse(input: unknown): TodayWeatherResponse {
  if (!isTodayWeatherResponse(input)) {
    throw new Error("Invalid TodayWeatherResponse payload");
  }
  return input;
}
