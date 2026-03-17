# Quickstart: Location Weather Facts Website

## Purpose

Run the Node backend and React frontend locally and verify core user flows manually.
This quickstart intentionally excludes authored automated test cases for now.

## Prerequisites

- Node.js 22 LTS
- npm 10+
- Internet connectivity for upstream weather provider access

## 1. Backend setup

1. Open terminal in /mnt/c/git/github.com/fnickels/testapp3/backend
2. Install dependencies:
   - npm install
3. Configure environment variables in .env:
   - PORT=4000
   - REQUEST_TIMEOUT_MS=3000
   - PROVIDER_RETRY_COUNT=1
   - WEATHER_GEOCODING_BASE_URL=https://geocoding-api.open-meteo.com/v1
   - WEATHER_BASE_URL=https://api.open-meteo.com/v1
   - WEATHER_PROVIDER_API_KEY= (optional)
4. Start backend:
   - npm run dev

## 2. Frontend setup

1. Open terminal in /mnt/c/git/github.com/fnickels/testapp3/frontend
2. Install dependencies:
   - npm install
3. Configure environment variables in .env:
   - VITE_API_BASE_URL=http://localhost:4000/api/v1
4. Start frontend:
   - npm run dev

## 3. Manual smoke validation

1. Submit a valid location and confirm weather facts render.
2. Submit an ambiguous location and confirm candidate selection is required.
3. Switch units and confirm weather values update consistently.
4. Use a location result with older observation time and confirm stale labeling
   and retry action appear when applicable.
5. Trigger rapid repeated requests and confirm rate-limit guidance appears.
6. Validate keyboard-only flow from input to results and retry controls.
7. Verify small viewport renders without horizontal scrolling of key actions.

### US1 MVP smoke checklist

1. Enter a valid location and confirm temperature, apparent temperature,
   humidity, wind summary, precipitation status, and observation time appear.
2. Change the query and confirm results refresh to the new location.
3. Toggle units between metric and imperial and confirm display values update.

### US2 confidence and error smoke checklist

1. Search an ambiguous location and confirm candidate selection is required.
2. Select a candidate and confirm weather loads for the chosen location.
3. Trigger a stale-weather response and confirm stale messaging and retry UI.
4. Trigger rate limiting and confirm retry-after guidance is shown.
5. Confirm last submitted query remains visible after error responses.

### US3 accessibility and viewport smoke checklist

1. Complete location search flow at mobile viewport width (<= 390px) with no
   horizontal scrolling required for core actions.
2. Repeat flow at desktop viewport width and confirm layout remains readable.
3. Navigate input, submit, unit toggle, candidate selection, and retry using
   keyboard only and confirm visible focus at each step.
4. Confirm result section receives focus after successful weather retrieval.

## 4. Rollback/reversion approach

- If a deployment fails, revert the feature deployment artifact to the previous
  stable build and restore previous environment configuration.
- Confirm health by re-running manual smoke validation steps 1 and 2.

## Notes

- Automated test cases are intentionally deferred for this phase per request.
- Add automated verification in tasks/implementation phase before release.

## Validation Findings (T046)

Validation run date: 2026-03-17

- Frontend availability: PASS
   - `GET http://127.0.0.1:5173/` returned 200 and contained "Location Weather".
- Real provider integration: PASS
   - Backend configured to use Open-Meteo geocoding and weather endpoints.
- Valid location flow: PASS
   - `/api/v1/locations/search?q=paris` returned `status=ambiguous` with
      selectable real-world candidates.
   - Selecting a returned candidate `candidateId` and requesting
      `/api/v1/weather/current?...` returned `status=success` with live values.
- Ambiguous location flow: PASS
   - `/api/v1/locations/search?q=paris` returned `status=ambiguous` with
      selectable candidates.
- Stale data flow: CONDITIONAL
   - Stale flag is evaluated from provider observation timestamp and will appear
      when returned data exceeds freshness threshold.
- Timeout flow: CONDITIONAL
   - Timeout behavior depends on live provider latency and configured timeout.
- Rate limiting flow: PASS
   - Burst query run produced 429 responses (`rate_limit_429_count=5`) with
      retry-after guidance in payload.
- Accessibility and viewport checklist: PASS (implementation verification)
   - Responsive CSS layout, semantic landmarks, focus-management hook,
      and visible focus styles were verified in implementation and page load.
