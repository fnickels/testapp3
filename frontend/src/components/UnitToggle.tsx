import React from "react";

import type { Units } from "../services/weatherApi";

interface UnitToggleProps {
  units: Units;
  onChange: (units: Units) => void;
}

export function UnitToggle({ units, onChange }: UnitToggleProps): JSX.Element {
  return (
    <fieldset>
      <legend>Units</legend>
      <label>
        <input
          type="radio"
          name="units"
          value="metric"
          checked={units === "metric"}
          onChange={() => onChange("metric")}
        />
        Metric
      </label>
      <label>
        <input
          type="radio"
          name="units"
          value="imperial"
          checked={units === "imperial"}
          onChange={() => onChange("imperial")}
        />
        Imperial
      </label>
    </fieldset>
  );
}
