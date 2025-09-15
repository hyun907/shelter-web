import React from "react";

// 강수상태코드(pty)에 따른 아이콘 매핑
const getWeatherIcon = (sky: string, pty?: string) => {
  // 강수상태가 있는 경우 (pty !== "0")
  if (pty && pty !== "0") {
    switch (pty) {
      case "1": // 비
        return "/src/assets/icon/ic_rain.svg";
      case "2": // 비/눈
        return "/src/assets/icon/ic_cloud_rain.svg";
      case "3": // 눈
        return "/src/assets/icon/ic_snow.svg";
      case "5": // 비
        return "/src/assets/icon/ic_rain.svg";
      case "6": // 비/눈
        return "/src/assets/icon/ic_cloud_rain.svg";
      case "7": // 눈
        return "/src/assets/icon/ic_snow.svg";
      default:
        return "/src/assets/icon/ic_rain.svg";
    }
  }

  switch (sky) {
    case "1": // 맑음
      return "/src/assets/icon/ic_sun.svg";
    case "2": // 구름조금
      return "/src/assets/icon/ic_cloud_small.svg";
    case "3": // 구름많음
      return "/src/assets/icon/ic_cloud_large.svg";
    case "4": // 흐림
      return "/src/assets/icon/ic_cloudy.svg";

    default:
      return "/src/assets/icon/ic_sun.svg";
  }
};

interface WeatherIconProps {
  sky: string;
  pty?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function WeatherIcon({ sky, pty, className, style }: WeatherIconProps) {
  const iconPath = getWeatherIcon(sky, pty);

  return <img src={iconPath} alt="weather icon" className={className} style={style} />;
}
