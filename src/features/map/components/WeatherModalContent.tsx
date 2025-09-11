import type { TodayWeatherResponse } from "../schemas/weather.schema";
import styles from "./WeatherOverlay.module.css";
import { normalizeTemp, toSkyKorean } from "../utils/weather";

export function WeatherModalContent({
  weather,
  loading,
  error
}: {
  weather: TodayWeatherResponse | null;
  loading?: boolean;
  error?: string | null;
}) {
  return (
    <>
      <div className={styles.header}>
        <strong className={styles.title}>오늘의 날씨</strong>
      </div>
      <div className={styles.contentScroll}>
        {loading && <div>불러오는 중...</div>}
        {error && !loading && <div style={{ color: "#ef4444" }}>오류: {error}</div>}
        {!loading && !error && weather && (
          <>
            <div className={styles.hero}>
              <div className={styles.location}>{weather.locationName}</div>
              <div className={styles.temp}>{normalizeTemp(weather.tmp)}</div>
              <div className={styles.skyText}>{toSkyKorean(weather.sky, weather.pty)}</div>
            </div>
            <div className={styles.sectionTitle}>상세 정보</div>
            <div className={styles.sectionCard}>
              <div className={styles.row}>
                <div className={styles.label}>강수확률</div>
                <div className={styles.value}>{weather.pop}%</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>강수형태</div>
                <div className={styles.value}>{weather.pty === "0" ? "없음" : weather.pty}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>1시간 강수량</div>
                <div className={styles.value}>{weather.pcp}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>1시간 기온</div>
                <div className={styles.value}>{normalizeTemp(weather.tmp)}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>풍속(동서성분)</div>
                <div className={styles.value}>{weather.uuu}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>풍속(남북성분)</div>
                <div className={styles.value}>{weather.vvv}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>파고</div>
                <div className={styles.value}>{weather.wav}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>풍향</div>
                <div className={styles.value}>{weather.vec}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>풍속</div>
                <div className={styles.value}>{weather.wsd} m/s</div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
