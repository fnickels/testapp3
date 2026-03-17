import React from "react";

import type { LocationCandidate } from "../services/weatherApi";

interface LocationCandidateListProps {
  candidates: LocationCandidate[];
  onSelect: (candidateId: string) => Promise<void> | void;
}

export function LocationCandidateList({ candidates, onSelect }: LocationCandidateListProps): JSX.Element {
  if (candidates.length === 0) {
    return <p>No candidate locations found.</p>;
  }

  return (
    <section aria-label="Candidate locations">
      <h3>Choose a location</h3>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.candidateId}>
            <button type="button" onClick={() => onSelect(candidate.candidateId)}>
              {candidate.displayName}, {candidate.region}, {candidate.country}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
