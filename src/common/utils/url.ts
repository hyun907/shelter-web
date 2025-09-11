export function buildApiUrl(baseUrl: string | undefined, path: string) {
  const cleanedPath = path.startsWith("/") ? path : `/${path}`;
  if (!baseUrl) return cleanedPath;
  const trimmed = baseUrl.replace(/\/$/, "");
  return `${trimmed}${cleanedPath}`;
}
