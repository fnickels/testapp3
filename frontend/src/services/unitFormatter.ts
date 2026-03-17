import type { CurrentWeather, Units } from "./weatherApi";

export interface FormattedWeather extends CurrentWeather {
  formattedTemperature: string;
  formattedApparentTemperature: string;
  formattedWindSpeed: string;
}

export function formatWeather(weather: CurrentWeather, units: Units): FormattedWeather {
  const temperatureUnit = units === "imperial" ? "F" : "C";
  const windUnit = units === "imperial" ? "mph" : "km/h";

  return {
    ...weather,
    formattedTemperature: `${weather.temperature} ${temperatureUnit}`,
    formattedApparentTemperature: `${weather.apparentTemperature} ${temperatureUnit}`,
    formattedWindSpeed: `${weather.windSpeed} ${windUnit}`,
  };
}
