export type Units = "metric" | "imperial";

export interface LocationCandidate {
  candidateId: string;
  displayName: string;
  region: string;
  country: string;
}

export interface ResolvedLocation {
  locationId: string;
  displayName: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  observedAt: string;
  temperature: number;
  apparentTemperature: number;
  humidityPercent: number;
  windSpeed: number;
  windDirection: string;
  precipitationStatus: string;
  units: Units;
  isStale: boolean;
  staleReason?: string | null;
}

export interface AmbiguousResponse {
  status: "ambiguous";
  message: string;
  candidates: LocationCandidate[];
}

export interface ResolvedResponse {
  status: "resolved";
  location: ResolvedLocation;
}

export interface CurrentWeatherResponse {
  status: "success";
  location: ResolvedLocation;
  weather: CurrentWeather;
}

export interface ApiErrorResponse {
  status: "error";
  code: string;
  message: string;
  retryAfterSeconds?: number | null;
}

function networkErrorResponse(): ApiErrorResponse {
  return {
    status: "error",
    code: "network_error",
    message: "Unable to reach the weather service. Check that the backend is running.",
  };
}

function withRetryAfterHeader(
  body: ApiErrorResponse,
  response: Response,
): ApiErrorResponse {
  const retryAfter = response.headers.get("Retry-After");
  if (!retryAfter) {
    return body;
  }

  const retryAfterSeconds = Number(retryAfter);
  if (Number.isNaN(retryAfterSeconds)) {
    return body;
  }

  return {
    ...body,
    retryAfterSeconds,
  };
}

const metaEnv = (import.meta as ImportMeta & {
  env?: Record<string, string | undefined>;
}).env;
const apiBase = metaEnv?.VITE_API_BASE_URL ?? "";

export async function searchLocations(q: string): Promise<AmbiguousResponse | ResolvedResponse | ApiErrorResponse> {
  try {
    const response = await fetch(`${apiBase}/locations/search?q=${encodeURIComponent(q)}`);
    const body = (await response.json()) as AmbiguousResponse | ResolvedResponse | ApiErrorResponse;
    if (body.status === "error") {
      return withRetryAfterHeader(body, response);
    }
    return body;
  } catch {
    return networkErrorResponse();
  }
}

export async function getCurrentWeather(
  locationId: string,
  units: Units,
): Promise<CurrentWeatherResponse | ApiErrorResponse> {
  try {
    const response = await fetch(
      `${apiBase}/weather/current?locationId=${encodeURIComponent(locationId)}&units=${units}`,
    );
    const body = (await response.json()) as CurrentWeatherResponse | ApiErrorResponse;
    if (body.status === "error") {
      return withRetryAfterHeader(body, response);
    }
    return body;
  } catch {
    return networkErrorResponse();
  }
}
