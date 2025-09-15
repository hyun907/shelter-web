export function normalizeTemp(tmp: string | number | undefined) {
  if (tmp == null) return "-";
  const str = String(tmp).trim();
  if (/°C$/.test(str)) return str;
  if (!Number.isNaN(Number(str))) return `${str}°C`;
  return str;
}

export function toSkyKorean(code: string, pty: string | undefined) {
  if (pty && pty !== "0") return "강수";
  switch (code) {
    case "1":
      return "맑음";
    case "2":
      return "구름조금";
    case "3":
      return "구름많음";
    case "4":
      return "흐림";
    default:
      return code;
  }
}

export function toPtyKorean(pty: string) {
  switch (pty) {
    case "0":
      return "없음";
    case "1":
      return "비";
    case "2":
      return "비/눈";
    case "3":
      return "눈";
    case "5":
      return "비";
    case "6":
      return "비/눈";
    case "7":
      return "눈";
    default:
      return pty;
  }
}

/**
 * 현재 날짜 기준으로 계절을 판단합니다.
 * @returns "summer" (4월~9월) 또는 "winter" (10월~3월)
 */
export function getCurrentSeason(): "summer" | "winter" {
  const currentMonth = new Date().getMonth() + 1;
  return currentMonth >= 4 && currentMonth <= 9 ? "summer" : "winter";
}
