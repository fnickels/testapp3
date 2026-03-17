import React from "react";

interface WeatherStatusPanelProps {
  message: string;
  stale?: boolean;
  onRetry?: () => Promise<void> | void;
}

export function WeatherStatusPanel({ message, stale = false, onRetry }: WeatherStatusPanelProps): JSX.Element {
  if (!message && !stale) {
    return <></>;
  }

  return (
    <section aria-live="polite" aria-label="Weather status">
      {message ? <p role="status">{message}</p> : null}
      {stale ? <p role="status">Displayed data may be stale.</p> : null}
      {onRetry ? (
        <button type="button" onClick={() => void onRetry()}>
          Retry
        </button>
      ) : null}
    </section>
  );
}
