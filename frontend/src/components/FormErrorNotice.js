import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
export function FormErrorNotice({ message }) {
    if (!message) {
        return _jsx(_Fragment, {});
    }
    return (_jsx("p", { role: "alert", style: { color: "var(--color-error)", marginTop: "var(--space-1)" }, children: message }));
}
