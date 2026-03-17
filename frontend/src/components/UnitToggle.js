import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function UnitToggle({ units, onChange }) {
    return (_jsxs("fieldset", { children: [_jsx("legend", { children: "Units" }), _jsxs("label", { children: [_jsx("input", { type: "radio", name: "units", value: "metric", checked: units === "metric", onChange: () => onChange("metric") }), "Metric"] }), _jsxs("label", { children: [_jsx("input", { type: "radio", name: "units", value: "imperial", checked: units === "imperial", onChange: () => onChange("imperial") }), "Imperial"] })] }));
}
