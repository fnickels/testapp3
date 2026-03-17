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
   - WEATHER_PROVIDER_BASE_URL=<provider-url>
   - WEATHER_PROVIDER_API_KEY=<secret-if-required>
   - REQUEST_TIMEOUT_MS=3000
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
4. Simulate stale response and confirm stale labeling and retry action appear.
5. Trigger rapid repeated requests and confirm rate-limit guidance appears.
6. Validate keyboard-only flow from input to results and retry controls.
7. Verify small viewport renders without horizontal scrolling of key actions.

## 4. Rollback/reversion approach

- If a deployment fails, revert the feature deployment artifact to the previous
  stable build and restore previous environment configuration.
- Confirm health by re-running manual smoke validation steps 1 and 2.

## Notes

- Automated test cases are intentionally deferred for this phase per request.
- Add automated verification in tasks/implementation phase before release.
