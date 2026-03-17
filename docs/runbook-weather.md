# Weather Service Runbook

## Purpose

Operational rollback and recovery guidance for the location weather web application.

## Deployment Reversion

1. Identify the last known good backend and frontend artifact versions.
2. Redeploy backend to previous stable release.
3. Redeploy frontend to previous stable release.
4. Restore previous environment variable set if it changed.

## Health Verification After Reversion

1. Check backend health endpoint: GET /health returns status ok.
2. Perform a location search and verify weather response payload structure.
3. Confirm frontend can load weather page and submit a search.
4. Confirm rate-limit responses still return Retry-After guidance.

## Incident Notes

- Capture incident timestamp, failing version, and rollback target version.
- Document whether stale-data handling and ambiguous-location handling behaved as expected.
- Record follow-up actions and ownership.
