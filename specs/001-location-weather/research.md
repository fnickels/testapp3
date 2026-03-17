# Research: Location Weather Facts Website

## Stack and Runtime

- Decision: Use a Node.js + TypeScript backend and React + TypeScript frontend.
- Rationale: Matches user direction, supports strong typing across API boundaries, and is well suited for rapid web delivery.
- Alternatives considered: Full-stack framework (rejected to keep backend integration boundaries explicit); backend-only rendering (rejected due to interactive UX needs).

## Weather Provider Integration Pattern

- Decision: Use a backend-owned provider client abstraction with request timeout, retry policy, and normalized response mapping.
- Rationale: Keeps provider details out of frontend, centralizes resilience behavior, and allows provider swaps without UI contract changes.
- Alternatives considered: Frontend direct provider calls (rejected due to key exposure and inconsistent error handling); hard-wired single client (rejected due to poor maintainability).

## Ambiguous Location Resolution

- Decision: Require explicit user choice from candidate locations when query matches multiple places.
- Rationale: Prevents silently returning weather for the wrong location and preserves user trust.
- Alternatives considered: Auto-select top result (rejected due to correctness risk); fail-only message (rejected due to poor UX).

## Units Strategy

- Decision: Default units from browser locale with user toggle between metric and imperial.
- Rationale: Balances local convention with user control and supports traveler use cases.
- Alternatives considered: Metric-only or imperial-only defaults (rejected due to reduced global usability).

## Freshness and Reliability Policy

- Decision: Mark weather data stale if observation age exceeds 15 minutes and provide retry action.
- Rationale: Maintains transparency when data is delayed and gives users a clear remediation path.
- Alternatives considered: Always show without stale indicator (rejected due to trust risk); hard fail after threshold (rejected due to reduced availability).

## Abuse Protection and Logging Retention

- Decision: Enforce per-client rate limiting with retry-after guidance; retain non-sensitive operational logs for 30 days.
- Rationale: Protects service availability and upstream quotas while meeting privacy-minimization requirements.
- Alternatives considered: No rate limiting (rejected due to abuse risk); indefinite log retention (rejected due to unnecessary data retention).
