import { WeatherProviderClient, type ProviderLocation } from "../clients/weatherProviderClient.js";

export interface ResolvedLocation {
  locationId: string;
  displayName: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface AmbiguousLocationResult {
  status: "ambiguous";
  message: string;
  candidates: ProviderLocation[];
}

export interface ResolvedLocationResult {
  status: "resolved";
  location: ResolvedLocation;
}

export type LocationResolutionResult = AmbiguousLocationResult | ResolvedLocationResult;

export class LocationResolutionService {
  constructor(private readonly provider = new WeatherProviderClient()) {}

  async resolve(query: string): Promise<LocationResolutionResult> {
    const candidates = await this.provider.searchLocations(query);

    if (candidates.length === 0) {
      return {
        status: "ambiguous",
        message: "No matching location found. Please provide more detail.",
        candidates: [],
      };
    }

    if (candidates.length > 1) {
      return {
        status: "ambiguous",
        message: "Multiple locations found. Please choose one.",
        candidates,
      };
    }

    const candidate = candidates[0];
    return {
      status: "resolved",
      location: {
        locationId: candidate.id,
        displayName: `${candidate.name}, ${candidate.region}, ${candidate.country}`,
        latitude: candidate.latitude,
        longitude: candidate.longitude,
        timezone: candidate.timezone,
      },
    };
  }
}
