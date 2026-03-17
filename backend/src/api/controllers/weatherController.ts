import type { Request, Response } from "express";

import { WeatherProviderClient } from "../../clients/weatherProviderClient.js";
import { buildApiError } from "../../models/api-error.js";
import { mapProviderError } from "../../services/errorMappingService.js";
import { normalizeWeather, type Units } from "../../services/weatherNormalizationService.js";

const client = new WeatherProviderClient();

function coerceUnits(unitsParam: unknown): Units {
  if (unitsParam === "imperial") {
    return "imperial";
  }
  return "metric";
}

export async function currentWeatherController(req: Request, res: Response): Promise<void> {
  const locationId = String(req.query.locationId ?? "").trim();
  if (!locationId) {
    res.status(400).json(buildApiError("invalid_input", "locationId is required"));
    return;
  }

  const units = coerceUnits(req.query.units);

  try {
    const providerWeather = await client.getCurrentWeather(locationId);
    const weather = normalizeWeather(providerWeather, units);

    res.status(200).json({
      status: "success",
      location: {
        locationId,
        displayName: locationId,
        latitude: 0,
        longitude: 0,
        timezone: "UTC",
      },
      weather,
    });
  } catch (error) {
    const mapped = mapProviderError(error);
    res.status(mapped.status).json(mapped.body);
  }
}
