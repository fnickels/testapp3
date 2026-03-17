import pino from "pino";

const LOG_RETENTION_DAYS = 30;

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: undefined,
  redact: {
    paths: ["req.headers.authorization", "apiKey", "metadata.rawText"],
    remove: true,
  },
});

const SENSITIVE_KEYS = new Set(["authorization", "apiKey", "rawText", "token", "password", "secret"]);

function sanitizeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => sanitizeValue(entry));
  }

  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, nestedValue] of Object.entries(value as Record<string, unknown>)) {
      if (SENSITIVE_KEYS.has(key)) {
        result[key] = "[redacted]";
      } else {
        result[key] = sanitizeValue(nestedValue);
      }
    }
    return result;
  }

  return value;
}

export function sanitizeMetadata(metadata: Record<string, unknown>): Record<string, unknown> {
  return sanitizeValue(metadata) as Record<string, unknown>;
}

export function logRetentionDays(): number {
  return LOG_RETENTION_DAYS;
}
