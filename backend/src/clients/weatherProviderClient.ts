import { getProviderConfig } from "../config/provider.js";

export interface ProviderLocation {
  id: string;
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface ProviderWeather {
  observedAt: string;
  temperature: number;
  apparentTemperature: number;
  humidityPercent: number;
  windSpeed: number;
  windDirection: string;
  precipitationStatus: string;
}

interface LocationToken {
  latitude: number;
  longitude: number;
  timezone: string;
}

interface OpenMeteoGeocodingResult {
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
}

interface OpenMeteoCurrentResponse {
  current?: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    precipitation: number;
  };
}

const providerConfig = getProviderConfig();

export class WeatherProviderClient {
  constructor(
    private readonly geocodingBaseUrl: string = providerConfig.geocodingBaseUrl,
    private readonly weatherBaseUrl: string = providerConfig.weatherBaseUrl,
  ) {}

  async searchLocations(query: string): Promise<ProviderLocation[]> {
    const url = `${this.geocodingBaseUrl}/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
    const response = await this.fetchJson(url);
    const results = (response.results ?? []) as OpenMeteoGeocodingResult[];

    return results.map((result) => {
      const token: LocationToken = {
        latitude: result.latitude,
        longitude: result.longitude,
        timezone: result.timezone ?? "auto",
      };

      return {
        id: this.encodeLocationToken(token),
        name: result.name,
        region: result.admin1 ?? "Unknown region",
        country: result.country ?? "Unknown country",
        latitude: result.latitude,
        longitude: result.longitude,
        timezone: result.timezone ?? "auto",
      };
    });
  }

  async getCurrentWeather(locationId: string): Promise<ProviderWeather> {
    const token = this.decodeLocationToken(locationId);
    const url = `${this.weatherBaseUrl}/forecast?latitude=${token.latitude}&longitude=${token.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,precipitation&timezone=${encodeURIComponent(token.timezone)}`;
    const response = await this.fetchJson(url);
    const current = (response as OpenMeteoCurrentResponse).current;

    if (!current) {
      throw new Error("Provider weather payload missing current section");
    }

    return {
      observedAt: current.time,
      temperature: current.temperature_2m,
      apparentTemperature: current.apparent_temperature,
      humidityPercent: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      windDirection: String(current.wind_direction_10m),
      precipitationStatus: current.precipitation > 0 ? "Precipitation" : "None",
    };
  }

  private async fetchJson(url: string): Promise<Record<string, unknown>> {
    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), providerConfig.timeoutMs);

    try {
      let lastError: Error | null = null;

      for (let attempt = 0; attempt <= providerConfig.retryCount; attempt += 1) {
        try {
          const response = await fetch(url, {
            headers: {
              "Content-Type": "application/json",
              ...(providerConfig.apiKey ? { "X-API-Key": providerConfig.apiKey } : {}),
            },
            signal: abortController.signal,
          });

          if (!response.ok) {
            throw new Error(`Provider request failed with status ${response.status}`);
          }

          return (await response.json()) as Record<string, unknown>;
        } catch (error) {
          lastError = error instanceof Error ? error : new Error("Provider request failed");
          if (attempt === providerConfig.retryCount) {
            throw lastError;
          }
        }
      }

      throw lastError ?? new Error("Provider request failed");
    } finally {
      clearTimeout(timeout);
    }
  }

  private encodeLocationToken(token: LocationToken): string {
    return Buffer.from(JSON.stringify(token)).toString("base64url");
  }

  private decodeLocationToken(locationId: string): LocationToken {
    try {
      const json = Buffer.from(locationId, "base64url").toString("utf-8");
      const parsed = JSON.parse(json) as Partial<LocationToken>;
      if (
        typeof parsed.latitude !== "number" ||
        typeof parsed.longitude !== "number" ||
        typeof parsed.timezone !== "string"
      ) {
        throw new Error("Invalid location token fields");
      }

      return {
        latitude: parsed.latitude,
        longitude: parsed.longitude,
        timezone: parsed.timezone,
      };
    } catch {
      throw new Error("Location token not found");
    }
  }
}
