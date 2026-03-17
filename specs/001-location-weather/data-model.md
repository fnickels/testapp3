# Data Model: Location Weather Facts Website

## Entity: LocationQuery

- Description: Raw and normalized user-submitted location input.
- Fields:
  - id: string (request-scoped unique ID)
  - rawText: string
  - normalizedText: string
  - submittedAt: datetime
  - clientFingerprint: string (non-PII rate-limit key)
- Validation rules:
  - rawText must be non-empty after trim
  - max length 120 characters
  - allow letters, numbers, spaces, comma, hyphen, apostrophe

## Entity: LocationCandidate

- Description: Candidate location returned when a query is ambiguous.
- Fields:
  - candidateId: string
  - displayName: string
  - region: string
  - country: string
  - latitude: number
  - longitude: number
  - confidence: number (0 to 1)
- Validation rules:
  - confidence between 0 and 1
  - displayName required

## Entity: ResolvedLocation

- Description: Single location selected or resolved for weather lookup.
- Fields:
  - locationId: string
  - displayName: string
  - latitude: number
  - longitude: number
  - timezone: string

## Entity: WeatherSnapshot

- Description: Normalized current-weather payload shown to users.
- Fields:
  - locationId: string
  - observedAt: datetime
  - fetchedAt: datetime
  - temperature: number
  - apparentTemperature: number
  - humidityPercent: number
  - windSpeed: number
  - windDirection: string
  - precipitationStatus: string
  - units: enum(metric, imperial)
  - isStale: boolean
  - staleReason: string|null
- Validation rules:
  - humidityPercent in range 0 to 100
  - units must be metric or imperial
  - isStale true when fetchedAt-observedAt > 15 minutes

## Entity: LookupResult

- Description: Outcome wrapper for frontend rendering.
- Fields:
  - status: enum(success, ambiguous, invalid_input, unresolved, provider_error, timeout, rate_limited)
  - message: string
  - retryAfterSeconds: integer|null
  - locationCandidates: LocationCandidate[]
  - resolvedLocation: ResolvedLocation|null
  - weather: WeatherSnapshot|null

## Entity: OperationalLogEvent

- Description: Non-sensitive event record for operational visibility.
- Fields:
  - eventId: string
  - eventType: enum(validation_error, unresolved_location, provider_error, timeout, rate_limited)
  - occurredAt: datetime
  - requestId: string
  - metadata: object (sanitized)
  - retentionDays: integer (fixed at 30)

## Relationships

- LocationQuery may produce zero or more LocationCandidate.
- LocationQuery resolves to one ResolvedLocation for successful weather lookup.
- ResolvedLocation has zero or one WeatherSnapshot per request.
- LookupResult encapsulates a request-level status and optional WeatherSnapshot.

## State Transitions

- Query lifecycle:
  - submitted -> validated -> resolved | ambiguous | invalid_input
  - resolved -> fetched -> success | provider_error | timeout | rate_limited
- Weather lifecycle:
  - fresh -> stale (after 15-minute threshold)
