function withRetryAfterHeader(body, response) {
    const retryAfter = response.headers.get("Retry-After");
    if (!retryAfter) {
        return body;
    }
    const retryAfterSeconds = Number(retryAfter);
    if (Number.isNaN(retryAfterSeconds)) {
        return body;
    }
    return {
        ...body,
        retryAfterSeconds,
    };
}
const apiBase = import.meta.env.VITE_API_BASE_URL;
export async function searchLocations(q) {
    const response = await fetch(`${apiBase}/locations/search?q=${encodeURIComponent(q)}`);
    const body = (await response.json());
    if (body.status === "error") {
        return withRetryAfterHeader(body, response);
    }
    return body;
}
export async function getCurrentWeather(locationId, units) {
    const response = await fetch(`${apiBase}/weather/current?locationId=${encodeURIComponent(locationId)}&units=${units}`);
    const body = (await response.json());
    if (body.status === "error") {
        return withRetryAfterHeader(body, response);
    }
    return body;
}
