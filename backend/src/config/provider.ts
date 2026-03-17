export interface ProviderConfig {
  geocodingBaseUrl: string;
  weatherBaseUrl: string;
  apiKey: string;
  timeoutMs: number;
  retryCount: number;
}

export function getProviderConfig(): ProviderConfig {
  return {
    geocodingBaseUrl:
      process.env.WEATHER_GEOCODING_BASE_URL ?? "https://geocoding-api.open-meteo.com/v1",
    weatherBaseUrl: process.env.WEATHER_BASE_URL ?? "https://api.open-meteo.com/v1",
    apiKey: process.env.WEATHER_PROVIDER_API_KEY ?? "",
    timeoutMs: Number(process.env.REQUEST_TIMEOUT_MS ?? 3000),
    retryCount: Number(process.env.PROVIDER_RETRY_COUNT ?? 1),
  };
}
