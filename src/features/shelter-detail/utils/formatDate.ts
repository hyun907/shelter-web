export function formatDate(dateTimeString?: string): string {
  if (!dateTimeString) return "정보 없음";

  return dateTimeString.split(" ")[0];
}
