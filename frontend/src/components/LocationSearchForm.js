import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export function LocationSearchForm({ onSubmit }) {
    const [query, setQuery] = useState("");
    return (_jsxs("form", { onSubmit: async (event) => {
            event.preventDefault();
            await onSubmit(query);
        }, "aria-label": "Location search", children: [_jsx("label", { htmlFor: "location-query", children: "Location" }), _jsx("input", { id: "location-query", name: "locationQuery", type: "text", value: query, onChange: (event) => setQuery(event.target.value), placeholder: "City, region, or postal code" }), _jsx("button", { type: "submit", children: "Get weather" })] }));
}
