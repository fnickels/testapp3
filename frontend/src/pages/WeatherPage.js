import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { CurrentWeatherCard } from "../components/CurrentWeatherCard";
import { FormErrorNotice } from "../components/FormErrorNotice";
import { LocationCandidateList } from "../components/LocationCandidateList";
import { LocationSearchForm } from "../components/LocationSearchForm";
import { UnitToggle } from "../components/UnitToggle";
import { WeatherStatusPanel } from "../components/WeatherStatusPanel";
import { useWeatherFocusFlow } from "../hooks/useWeatherFocusFlow";
import { getCurrentWeather, searchLocations, } from "../services/weatherApi";
import { browserDefaultUnits } from "../state/weatherPreferences";
import { initialSearchState, withLastSubmittedQuery } from "../state/searchState";
import "../styles/theme.css";
import "../styles/weather-page.css";
export function WeatherPage() {
    const [units, setUnits] = React.useState(browserDefaultUnits());
    const [location, setLocation] = React.useState(null);
    const [weatherResponse, setWeatherResponse] = React.useState(null);
    const [candidates, setCandidates] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const [searchState, setSearchState] = React.useState(initialSearchState);
    const { resultsRef } = useWeatherFocusFlow(Boolean(weatherResponse));
    async function loadWeatherForLocation(locationId) {
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
    async function onSearch(query) {
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
    async function onSelectCandidate(candidateId) {
        setCandidates([]);
        await loadWeatherForLocation(candidateId);
    }
    React.useEffect(() => {
        async function reloadWeather() {
            if (!location) {
                return;
            }
            await loadWeatherForLocation(location.locationId);
        }
        void reloadWeather();
    }, [units, location?.locationId]);
    const stale = weatherResponse?.weather.isStale ?? false;
    return (_jsxs("main", { className: "weather-page", "aria-labelledby": "weather-page-title", children: [_jsxs("header", { children: [_jsx("h1", { id: "weather-page-title", children: "Location Weather" }), _jsx("p", { children: "Search for a location to view current weather facts." }), searchState.lastSubmittedQuery ? _jsxs("p", { children: ["Last query: ", searchState.lastSubmittedQuery] }) : null] }), _jsxs("section", { className: "weather-grid", "aria-label": "Weather application content", children: [_jsxs("section", { className: "weather-controls", "aria-label": "Search controls", children: [_jsx(LocationSearchForm, { onSubmit: onSearch }), _jsx(FormErrorNotice, { message: message }), _jsx(UnitToggle, { units: units, onChange: setUnits })] }), _jsxs("section", { className: "weather-status", "aria-label": "Status and options", children: [_jsx(LocationCandidateList, { candidates: candidates, onSelect: onSelectCandidate }), _jsx(WeatherStatusPanel, { message: message, stale: stale, onRetry: () => onSearch(searchState.lastSubmittedQuery) })] }), weatherResponse ? (_jsx("section", { className: "weather-card", ref: resultsRef, tabIndex: -1, children: _jsx(CurrentWeatherCard, { location: weatherResponse.location, weather: weatherResponse.weather }) })) : null] })] }));
}
