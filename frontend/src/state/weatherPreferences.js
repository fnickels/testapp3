export function browserDefaultUnits(locale = navigator.language) {
    return locale.startsWith("en-US") ? "imperial" : "metric";
}
export const initialWeatherPreferences = {
    selectedUnits: browserDefaultUnits(),
    selectedLocationId: null,
};
