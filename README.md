# testapp3

## Location Weather Application

This repository now contains a Node.js backend and React frontend for a location-based weather experience.

## Project Structure

- backend: Express API for location search and current weather retrieval
- frontend: React UI for search, weather display, units toggle, and accessibility-focused interaction
- specs/001-location-weather: specification, plan, contracts, tasks, and quickstart guides

## Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm 9+

## Install Dependencies

```bash
npm --prefix backend install
npm --prefix frontend install
```

## Configure Environment

Backend environment file (`backend/.env`):

```env
PORT=4000
REQUEST_TIMEOUT_MS=3000
PROVIDER_RETRY_COUNT=1
WEATHER_GEOCODING_BASE_URL=https://geocoding-api.open-meteo.com/v1
WEATHER_BASE_URL=https://api.open-meteo.com/v1
WEATHER_PROVIDER_API_KEY=<provider-key>
```

Frontend environment file (`frontend/.env`):

```env
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

## Run Locally

In one terminal:

```bash
npm run dev:backend
```

In another terminal:

```bash
npm run dev:frontend
```

## Type Check

```bash
npm --prefix backend run typecheck
npm --prefix frontend run typecheck
```

## Operations

- Rollback/runbook: docs/runbook-weather.md
- Manual smoke flow: specs/001-location-weather/quickstart.md