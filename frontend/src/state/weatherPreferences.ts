export type Units = "metric" | "imperial";

export interface WeatherPreferencesState {
  selectedUnits: Units;
  selectedLocationId: string | null;
}

export function browserDefaultUnits(locale: string = navigator.language): Units {
  return locale.startsWith("en-US") ? "imperial" : "metric";
}

export const initialWeatherPreferences: WeatherPreferencesState = {
  selectedUnits: browserDefaultUnits(),
  selectedLocationId: null,
};
