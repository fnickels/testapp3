import { buildApiError, type ApiErrorBody } from "../models/api-error.js";

export function mapProviderError(error: unknown): { status: number; body: ApiErrorBody } {
  const message = error instanceof Error ? error.message : "Provider request failed";

  if (message.toLowerCase().includes("timeout") || message.toLowerCase().includes("abort")) {
    return {
      status: 504,
      body: buildApiError("timeout", "Weather service timed out. Please retry."),
    };
  }

  if (message.toLowerCase().includes("not found")) {
    return {
      status: 404,
      body: buildApiError("unresolved_location", "Location could not be resolved."),
    };
  }

  return {
    status: 502,
    body: buildApiError("provider_error", "Weather provider error. Please retry."),
  };
}
