import React, { useState } from "react";

interface LocationSearchFormProps {
  onSubmit: (query: string) => Promise<void> | void;
}

export function LocationSearchForm({ onSubmit }: LocationSearchFormProps): JSX.Element {
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit(query);
      }}
      aria-label="Location search"
    >
      <label htmlFor="location-query">Location</label>
      <input
        id="location-query"
        name="locationQuery"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="City, region, or postal code"
      />
      <button type="submit">Get weather</button>
    </form>
  );
}
