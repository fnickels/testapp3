import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function LocationCandidateList({ candidates, onSelect }) {
    if (candidates.length === 0) {
        return _jsx("p", { children: "No candidate locations found." });
    }
    return (_jsxs("section", { "aria-label": "Candidate locations", children: [_jsx("h3", { children: "Choose a location" }), _jsx("ul", { children: candidates.map((candidate) => (_jsx("li", { children: _jsxs("button", { type: "button", onClick: () => onSelect(candidate.candidateId), children: [candidate.displayName, ", ", candidate.region, ", ", candidate.country] }) }, candidate.candidateId))) })] }));
}
