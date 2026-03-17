import React from "react";

import { CurrentWeatherCard } from "../components/CurrentWeatherCard";
import { FormErrorNotice } from "../components/FormErrorNotice";
import { LocationCandidateList } from "../components/LocationCandidateList";
import { LocationSearchForm } from "../components/LocationSearchForm";
import { UnitToggle } from "../components/UnitToggle";
import { WeatherStatusPanel } from "../components/WeatherStatusPanel";
import { useWeatherFocusFlow } from "../hooks/useWeatherFocusFlow";
import {
  getCurrentWeather,
  searchLocations,
  type CurrentWeatherResponse,
  type LocationCandidate,
  type ResolvedLocation,
  type Units,
} from "../services/weatherApi";
import { browserDefaultUnits } from "../state/weatherPreferences";
import { initialSearchState, withLastSubmittedQuery } from "../state/searchState";
import "../styles/theme.css";
import "../styles/weather-page.css";

export function WeatherPage(): JSX.Element {
  const [units, setUnits] = React.useState<Units>(browserDefaultUnits());
  const [location, setLocation] = React.useState<ResolvedLocation | null>(null);
  const [weatherResponse, setWeatherResponse] = React.useState<CurrentWeatherResponse | null>(null);
  const [candidates, setCandidates] = React.useState<LocationCandidate[]>([]);
  const [message, setMessage] = React.useState<string>("");
  const [searchState, setSearchState] = React.useState(initialSearchState);
  const { resultsRef } = useWeatherFocusFlow(Boolean(weatherResponse));

  async function loadWeatherForLocation(locationId: string): Promise<void> {
    const weatherResult = await getCurrentWeather(locationId, units);
    if (weatherResult.status === "error") {
      const retryMessage = weatherResult.retryAfterSeconds
        ? ` Retry in ${weatherResult.retryAfterSeconds} seconds.`
        : "";
      setMessage(`${weatherResult.message}${retryMessage}`);
      return;
    }

    setWeatherResponse(weatherResult);
    setLocation(weatherResult.location);
  }

  async function onSearch(query: string): Promise<void> {
    setMessage("");
    setSearchState(withLastSubmittedQuery(query));

    const locationResult = await searchLocations(query);
    if (locationResult.status === "error") {
      const retryMessage = locationResult.retryAfterSeconds
        ? ` Retry in ${locationResult.retryAfterSeconds} seconds.`
        : "";
      setMessage(`${locationResult.message}${retryMessage}`);
      return;
    }

    if (locationResult.status === "ambiguous") {
      setMessage(locationResult.message);
      setCandidates(locationResult.candidates);
      return;
    }

    setCandidates([]);
    setLocation(locationResult.location);
    await loadWeatherForLocation(locationResult.location.locationId);
  }

  async function onSelectCandidate(candidateId: string): Promise<void> {
    setCandidates([]);
    await loadWeatherForLocation(candidateId);
  }

  React.useEffect(() => {
    async function reloadWeather(): Promise<void> {
      if (!location) {
        return;
      }

      await loadWeatherForLocation(location.locationId);
    }

    void reloadWeather();
  }, [units, location?.locationId]);

  const stale = weatherResponse?.weather.isStale ?? false;

  return (
    <main className="weather-page" aria-labelledby="weather-page-title">
      <header className="weather-hero">
        <h1 id="weather-page-title">Location Weather</h1>
        <p>Search for a location to view current weather facts.</p>
        {searchState.lastSubmittedQuery ? (
          <p className="query-chip">Last query: {searchState.lastSubmittedQuery}</p>
        ) : null}
      </header>

      <section className="weather-grid" aria-label="Weather application content">
        <section className="weather-controls" aria-label="Search controls">
          <LocationSearchForm onSubmit={onSearch} />
          <FormErrorNotice message={message} />
          <UnitToggle units={units} onChange={setUnits} />
        </section>

        <section className="weather-status" aria-label="Status and options">
          <LocationCandidateList candidates={candidates} onSelect={onSelectCandidate} />
          <WeatherStatusPanel
            message={message}
            stale={stale}
            onRetry={() => onSearch(searchState.lastSubmittedQuery)}
          />
        </section>

        {weatherResponse ? (
          <section className="weather-card" ref={resultsRef} tabIndex={-1}>
            <CurrentWeatherCard location={weatherResponse.location} weather={weatherResponse.weather} />
          </section>
        ) : null}
      </section>
    </main>
  );
}
