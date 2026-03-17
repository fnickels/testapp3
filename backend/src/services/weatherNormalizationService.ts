import type { ProviderWeather } from "../clients/weatherProviderClient.js";

export type Units = "metric" | "imperial";

export interface NormalizedWeather {
  observedAt: string;
  temperature: number;
  apparentTemperature: number;
  humidityPercent: number;
  windSpeed: number;
  windDirection: string;
  precipitationStatus: string;
  units: Units;
  isStale: boolean;
  staleReason: string | null;
}

const STALE_THRESHOLD_MS = 15 * 60 * 1000;

export function normalizeWeather(provider: ProviderWeather, units: Units): NormalizedWeather {
  const observedAtMs = new Date(provider.observedAt).getTime();
  const isStale = Number.isFinite(observedAtMs) && Date.now() - observedAtMs > STALE_THRESHOLD_MS;

  return {
    observedAt: provider.observedAt,
    temperature: provider.temperature,
    apparentTemperature: provider.apparentTemperature,
    humidityPercent: provider.humidityPercent,
    windSpeed: provider.windSpeed,
    windDirection: provider.windDirection,
    precipitationStatus: provider.precipitationStatus,
    units,
    isStale,
    staleReason: isStale ? "Weather observation is older than 15 minutes" : null,
  };
}
