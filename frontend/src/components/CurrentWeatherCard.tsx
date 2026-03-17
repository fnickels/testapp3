import React from "react";

import type { CurrentWeather, ResolvedLocation } from "../services/weatherApi";

interface CurrentWeatherCardProps {
  location: ResolvedLocation;
  weather: CurrentWeather;
}

export function CurrentWeatherCard({ location, weather }: CurrentWeatherCardProps): JSX.Element {
  return (
    <section aria-label="Current weather facts">
      <h2>{location.displayName}</h2>
      <ul>
        <li>Temperature: {weather.temperature}</li>
        <li>Feels like: {weather.apparentTemperature}</li>
        <li>Humidity: {weather.humidityPercent}%</li>
        <li>
          Wind: {weather.windSpeed} {weather.windDirection}
        </li>
        <li>Precipitation: {weather.precipitationStatus}</li>
        <li>Observed at: {new Date(weather.observedAt).toLocaleString()}</li>
      </ul>
      {weather.isStale ? <p role="status">Data may be stale. {weather.staleReason}</p> : null}
    </section>
  );
}
