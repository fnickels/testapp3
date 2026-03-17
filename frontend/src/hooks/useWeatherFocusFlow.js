import { useEffect, useRef } from "react";
export function useWeatherFocusFlow(trigger) {
    const resultsRef = useRef(null);
    useEffect(() => {
        if (!trigger || !resultsRef.current) {
            return;
        }
        resultsRef.current.focus();
    }, [trigger]);
    return { resultsRef };
}
