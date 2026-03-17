export function formatWeather(weather, units) {
    const temperatureUnit = units === "imperial" ? "F" : "C";
    const windUnit = units === "imperial" ? "mph" : "km/h";
    return {
        ...weather,
        formattedTemperature: `${weather.temperature} ${temperatureUnit}`,
        formattedApparentTemperature: `${weather.apparentTemperature} ${temperatureUnit}`,
        formattedWindSpeed: `${weather.windSpeed} ${windUnit}`,
    };
}
