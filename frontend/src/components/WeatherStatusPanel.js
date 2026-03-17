import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function WeatherStatusPanel({ message, stale = false, onRetry }) {
    if (!message && !stale) {
        return _jsx(_Fragment, {});
    }
    return (_jsxs("section", { "aria-live": "polite", "aria-label": "Weather status", children: [message ? _jsx("p", { role: "status", children: message }) : null, stale ? _jsx("p", { role: "status", children: "Displayed data may be stale." }) : null, onRetry ? (_jsx("button", { type: "button", onClick: () => void onRetry(), children: "Retry" })) : null] }));
}
