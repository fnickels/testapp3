import { useEffect, useRef } from "react";

export function useWeatherFocusFlow(trigger: boolean): { resultsRef: React.RefObject<HTMLElement> } {
  const resultsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!trigger || !resultsRef.current) {
      return;
    }

    resultsRef.current.focus();
  }, [trigger]);

  return { resultsRef };
}
