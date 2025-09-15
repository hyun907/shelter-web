import React from "react";
import { getWeatherIcon } from "../utils/weather";

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
