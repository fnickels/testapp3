export type ErrorCode =
  | "invalid_input"
  | "unresolved_location"
  | "provider_error"
  | "timeout"
  | "rate_limited";

export interface ApiErrorBody {
  status: "error";
  code: ErrorCode;
  message: string;
  retryAfterSeconds?: number | null;
}

export function buildApiError(
  code: ErrorCode,
  message: string,
  retryAfterSeconds?: number | null,
): ApiErrorBody {
  return {
    status: "error",
    code,
    message,
    retryAfterSeconds: retryAfterSeconds ?? null,
  };
}
