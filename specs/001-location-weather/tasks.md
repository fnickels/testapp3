---
description: "Task list for implementing the location weather facts website"
---

# Tasks: Location Weather Facts Website

**Input**: Design documents from `/specs/001-location-weather/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Per request, do not create automated test cases in this phase. Include manual verification and implementation-ready hooks for later automation.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Every task includes a concrete file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize project scaffolding for Node backend and React frontend.

- [X] T001 Initialize backend Node/TypeScript project manifest in backend/package.json
- [X] T002 Initialize frontend React/Vite TypeScript manifest in frontend/package.json
- [X] T003 [P] Add backend environment template in backend/.env.example
- [X] T004 [P] Add frontend environment template in frontend/.env.example
- [X] T005 [P] Add root workspace scripts for backend/frontend dev workflows in package.json
- [X] T006 [P] Create base backend app entrypoint in backend/src/app.ts
- [X] T007 [P] Create base frontend app shell in frontend/src/pages/WeatherPage.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core platform capabilities required before user story delivery.

**CRITICAL**: User story work starts only after this phase.

- [X] T008 Finalize API contract for location search and weather retrieval in specs/001-location-weather/contracts/weather-api.yaml
- [X] T009 Implement API error model and response helper in backend/src/models/api-error.ts
- [X] T010 [P] Implement request logging configuration with retention policy hooks in backend/src/config/logging.ts
- [X] T011 [P] Implement per-client rate-limit middleware with Retry-After support in backend/src/middleware/rateLimit.ts
- [X] T012 Implement location-query input validation schema in backend/src/api/validators/locationQuery.ts
- [X] T013 Implement weather provider client abstraction with timeout handling in backend/src/clients/weatherProviderClient.ts
- [X] T014 Implement location resolution domain service in backend/src/services/locationResolutionService.ts
- [X] T015 Implement weather normalization and stale-policy logic in backend/src/services/weatherNormalizationService.ts
- [X] T016 [P] Implement typed frontend API service contract client in frontend/src/services/weatherApi.ts
- [X] T017 [P] Implement shared frontend state for unit preference and selected location in frontend/src/state/weatherPreferences.ts

**Checkpoint**: Foundation complete; user stories are unblocked.

---

## Phase 3: User Story 1 - Search Current Weather by Location (Priority: P1) 🎯 MVP

**Goal**: User can search for a location and view current weather facts with unit toggle support.

**Independent Test**: From the weather page, submit a valid location and confirm weather facts render and unit toggle updates values.

### Implementation for User Story 1

- [X] T018 [P] [US1] Build location search form component in frontend/src/components/LocationSearchForm.tsx
- [X] T019 [P] [US1] Build weather facts display card in frontend/src/components/CurrentWeatherCard.tsx
- [X] T020 [US1] Implement location search route wiring in backend/src/api/routes/locationRoutes.ts
- [X] T021 [US1] Implement weather route wiring in backend/src/api/routes/weatherRoutes.ts
- [X] T022 [US1] Implement weather request controller flow in backend/src/api/controllers/weatherController.ts
- [X] T023 [US1] Implement location resolution controller flow in backend/src/api/controllers/locationController.ts
- [X] T024 [US1] Implement page-level search-to-result flow in frontend/src/pages/WeatherPage.tsx
- [X] T025 [US1] Implement unit toggle component with browser-locale default in frontend/src/components/UnitToggle.tsx
- [X] T026 [US1] Implement display unit formatting utilities in frontend/src/services/unitFormatter.ts
- [X] T027 [US1] Add US1 manual smoke validation steps in specs/001-location-weather/quickstart.md

**Checkpoint**: User Story 1 is fully functional and manually verifiable.

---

## Phase 4: User Story 2 - Understand Data Confidence and Errors (Priority: P2)

**Goal**: User can interpret ambiguous locations, stale data, and operational error states.

**Independent Test**: Trigger ambiguous, invalid, stale, and rate-limited scenarios and verify clear guidance and retry behavior.

### Implementation for User Story 2

- [X] T028 [P] [US2] Build ambiguous-location candidate picker component in frontend/src/components/LocationCandidateList.tsx
- [X] T029 [US2] Implement ambiguous candidate response handling in backend/src/api/controllers/locationController.ts
- [X] T030 [US2] Implement provider/timeout/unresolved error mapping service in backend/src/services/errorMappingService.ts
- [X] T031 [US2] Implement stale-weather response annotations in backend/src/api/controllers/weatherController.ts
- [X] T032 [US2] Implement frontend status panel for error/empty/stale states in frontend/src/components/WeatherStatusPanel.tsx
- [X] T033 [US2] Preserve last submitted query across failures in frontend/src/state/searchState.ts
- [X] T034 [US2] Implement Retry-After response handling in frontend/src/services/weatherApi.ts
- [X] T035 [US2] Add US2 manual smoke validation steps in specs/001-location-weather/quickstart.md

**Checkpoint**: User Story 2 is fully functional and manually verifiable.

---

## Phase 5: User Story 3 - Use the Site Across Devices and Assistive Input (Priority: P3)

**Goal**: User completes the core flow on mobile/desktop with accessible keyboard-first interaction.

**Independent Test**: Complete search and retry flows on small and large viewports with keyboard-only navigation.

### Implementation for User Story 3

- [X] T036 [P] [US3] Implement responsive weather page layout styles in frontend/src/styles/weather-page.css
- [X] T037 [P] [US3] Add semantic landmarks and accessible labeling in frontend/src/pages/WeatherPage.tsx
- [X] T038 [US3] Implement keyboard focus flow management hook in frontend/src/hooks/useWeatherFocusFlow.ts
- [X] T039 [US3] Implement accessible inline form error announcement component in frontend/src/components/FormErrorNotice.tsx
- [X] T040 [US3] Add high-contrast color tokens for critical text and controls in frontend/src/styles/theme.css
- [X] T041 [US3] Add US3 manual accessibility and viewport validation steps in specs/001-location-weather/quickstart.md

**Checkpoint**: User Story 3 is fully functional and manually verifiable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final hardening, documentation, and release-readiness.

- [X] T042 [P] Document setup and runtime configuration for backend/frontend in README.md
- [X] T043 [P] Document rollback and reversion runbook in docs/runbook-weather.md
- [X] T044 Harden log sanitization and metadata scrubbing rules in backend/src/config/logging.ts
- [X] T045 Tune provider timeout and retry defaults in backend/src/config/provider.ts
- [X] T046 Run full manual quickstart validation and capture findings in specs/001-location-weather/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies
- Foundational (Phase 2): Depends on Setup; blocks all user stories
- User Stories (Phases 3-5): Depend on Foundational completion
- Polish (Phase 6): Depends on completion of desired user stories

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational; no dependency on US2 or US3
- **US2 (P2)**: Starts after Foundational; integrates with US1 endpoints/UI flow
- **US3 (P3)**: Starts after Foundational; integrates with established UI from US1/US2

### Within Each User Story

- Backend routes/controllers depend on foundational middleware/services
- Frontend page integration depends on API service availability
- Manual verification tasks run after core implementation tasks in each story

### Parallel Opportunities

- Phase 1 tasks T003-T007 can run in parallel with T001/T002 once directories exist
- Foundational tasks T010, T011, T016, T017 are parallelizable
- US1 component tasks T018/T019 are parallelizable
- US2 component/state tasks T028/T032/T033 are parallelizable
- US3 styling/semantics tasks T036/T037 are parallelizable
- Polish documentation tasks T042/T043 are parallelizable

---

## Parallel Example: User Story 1

```bash
Task: "Build location search form component in frontend/src/components/LocationSearchForm.tsx"
Task: "Build weather facts display card in frontend/src/components/CurrentWeatherCard.tsx"
Task: "Implement unit toggle component with browser-locale default in frontend/src/components/UnitToggle.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 Setup
2. Complete Phase 2 Foundational
3. Complete Phase 3 US1
4. Validate US1 manually via quickstart
5. Demo/deploy MVP increment

### Incremental Delivery

1. Setup + Foundational
2. Deliver US1 and validate
3. Deliver US2 and validate
4. Deliver US3 and validate
5. Complete polish and release readiness

### Parallel Team Strategy

1. Team aligns on Setup + Foundational
2. After Foundational:
   - Dev A: US1 backend/controllers
   - Dev B: US1/US2 frontend components
   - Dev C: US3 accessibility/responsive work
3. Merge by phase checkpoints with quickstart validation

---

## Notes

- Task format validated: every task uses checkbox, ID, optional [P], story label where required, and file path.
- Automated test-case authoring is intentionally deferred in this phase per user request.
- Manual verification tasks are included to keep each story independently verifiable.
