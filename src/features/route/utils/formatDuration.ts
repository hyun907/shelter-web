export function formatDurationFromMs(durationMs: number): string {
  const totalSeconds = durationMs / 1000;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.round(totalSeconds % 60);
  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }
  if (minutes > 0) {
    const paddedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}분 ${paddedSeconds}초`;
  }
  return `${seconds}초`;
}
