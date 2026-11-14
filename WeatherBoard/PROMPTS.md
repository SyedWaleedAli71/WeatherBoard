# PROMPTS.md — Agent Prompt History

Chronological record of AI-assisted development for **WeatherBoard**.

| Field | Value |
| --- | --- |
| IDE | **OpenCode** |
| Agent | OpenCode coding agent (model: Big Pickle) |
| Challenge | Edspire Frontend (React) Developer Technical Challenge, November 2026 |
| First recorded session | Saturday, 14 November 2026 |

## Fidelity note

This file records only prompts and work that actually occurred. The initial WeatherBoard
dashboard UI, Vite scaffold, and `package.json` existed before this log. The prompts, AI tool,
and agent used for that earlier work were not provided, so they are **not** reconstructed or
invented here. The history below begins with the first prompt received for Phase 1.

---

## Session 1 — Phase 1: PDF analysis, project audit, structure, and documentation

**Date:** 14 November 2026
**Status:** Completed

### Prompt submitted (verbatim)

<details>
<summary>Expand the full Phase 1 prompt</summary>

````text
# WeatherBoard — Project Understanding, PDF Analysis & Professional Folder Structure Setup

## 1. Project Overview

You are working as the primary AI development agent for my existing project, **WeatherBoard**.

WeatherBoard is an existing React + Vite weather dashboard project. The initial UI has already been developed, and the application is running.

Your responsibility is to understand the project requirements from the provided Edspire technical assessment PDF, inspect the existing codebase, organize the project professionally, and prepare it for further development.

**Important:** This is an existing project. Do not create a new React project or replace the current application.

## 2. Read and Understand the PDF

First, locate the Edspire technical assessment PDF inside the project directory.

Read the complete PDF, including every page, heading, instruction, requirement, technical specification, and submission condition.

Do not skip any page.

Extract and understand:

- Project objectives and expected functionality.
- Required frontend technologies and libraries.
- API and external service requirements.
- UI/UX and responsive design requirements.
- Data storage and browser storage requirements.
- Validation and error-handling requirements.
- PWA and offline requirements, if specified.
- Deliverables, deployment, GitHub, and submission instructions.
- Any restrictions, deadlines, or evaluation criteria.

Treat the PDF as the primary source of truth.

Do not assume that a feature is required just because it is common in weather applications. Only include requirements supported by the PDF.

If the PDF cannot be found, opened, or fully read, stop and tell me what is missing. Do not guess its contents.

## 3. Inspect the Existing Project

Before changing anything, carefully inspect:

- Existing folder and file structure.
- package.json and installed dependencies.
- React components and their responsibilities.
- App.jsx and existing application entry points.
- App.css and index.css.
- Existing UI and implemented interactions.
- Existing API integrations, if any.
- Current application errors or incomplete functionality.

Identify which features are already implemented, partially implemented, or missing.

Preserve all working functionality.

Do not unnecessarily rewrite existing components, delete files, replace dependencies, or change the project's technology stack.

Use JavaScript (.js/.jsx), not TypeScript.

## 4. Professional Folder Structure

After inspecting the project and understanding the PDF, organize the existing project using this planned structure:

WeatherBoard/
│
├── public/
│   ├── icons/
│   │   ├── pwa-192.png
│   │   └── pwa-512.png
│   ├── favicon.svg
│   └── manifest.webmanifest
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── weather/
│   │   │   ├── CurrentWeather.jsx
│   │   │   ├── WeatherHighlights.jsx
│   │   │   └── Forecast.jsx
│   │   │
│   │   ├── search/
│   │   │   └── CitySearch.jsx
│   │   │
│   │   ├── favorites/
│   │   │   └── FavoriteCities.jsx
│   │   │
│   │   └── common/
│   │       ├── Loading.jsx
│   │       ├── ErrorMessage.jsx
│   │       └── OfflineBanner.jsx
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── services/
│   │   ├── weatherService.js
│   │   └── cityService.js
│   │
│   ├── hooks/
│   │   ├── useWeather.js
│   │   └── useFavorites.js
│   │
│   ├── utils/
│   │   ├── storage.js
│   │   └── validation.js
│   │
│   ├── styles/
│   │   └── variables.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── PROMPTS.md

### Folder Structure Instructions

- Create the folders and files that are appropriate for the actual PDF requirements.
- Reuse and move existing components where possible instead of creating duplicate components.
- Do not overwrite existing working files with empty placeholder files.
- Do not create unnecessary files or duplicate functionality.
- If an existing file has a different name or location, map it sensibly into the planned structure.
- Update imports and file paths whenever files are moved.
- Keep the project compatible with the existing React + Vite setup.
- Do not install additional dependencies without explaining why they are needed.
- If a planned file is not currently required, explain why before omitting it.

## 5. Existing UI Design — Preserve and Improve

The existing WeatherBoard dashboard uses a dark navy and cyan visual theme.

Maintain its visual identity:

- Dark navy background: #0B1220
- Card background: #111C2D
- Cyan accent: #38BDF8
- Inter typography.

The design should remain modern, professional, clean, readable, and responsive.

Do not redesign the entire application or replace the existing UI with a completely different template.

Any future UI improvements should preserve the existing design direction.

## 6. AI Prompt Documentation

Create or update a root-level file named PROMPTS.md.

This file must maintain an accurate chronological record of AI-assisted project development.

Include:

- Project setup and initial development history.
- Prompts actually submitted to the AI agent.
- Important decisions and implementation instructions.
- Features implemented by the agent.
- Files or components modified.
- Important issues discovered and resolved.

Do not invent prompts or claim that a particular AI tool implemented work it did not perform.

Keep the documentation organized and easy to read.

## 7. Safety Rules

These rules are mandatory:

1. Do not delete existing project files without my approval.
2. Do not create a new project.
3. Do not replace the existing UI unnecessarily.
4. Do not change JavaScript to TypeScript.
5. Do not introduce fake weather data and present it as real API data.
6. Do not expose API keys or secrets in source code.
7. Do not make assumptions about PDF requirements.
8. Do not make unnecessary changes to package.json.
9. Keep all existing working features functional.
10. Prioritize maintainable, reusable, modular code.

## 8. Execution Plan

Follow these steps in order:

**Phase 1 — PDF Analysis**
Read the complete PDF and prepare a structured list of mandatory requirements.

**Phase 2 — Existing Project Audit**
Inspect the current codebase and identify existing functionality, missing features, and potential issues.

**Phase 3 — Requirement Comparison**
Compare the PDF requirements against the existing project. Identify completed, partially completed, and missing requirements.

**Phase 4 — Folder Structure Setup**
Create the professional folder structure described above. Carefully organize existing files and update imports without breaking the application.

**Phase 5 — Documentation**
Create or update README.md and PROMPTS.md. Do not invent project details.

**Phase 6 — Verification**
Run the appropriate project checks, including the existing build command. Fix only issues caused by your changes and report any pre-existing issues separately.

## 9. Final Report

After completing these tasks, provide a clear report containing:

1. Your understanding of the WeatherBoard project.
2. A summary of all PDF requirements.
3. Existing features and missing features.
4. The final folder structure.
5. Files created, moved, or modified.
6. Dependencies added or changed, if any.
7. Build and verification results.
8. Any remaining issues or questions.
9. The recommended next development phase.

**Final instruction:** Work carefully and professionally. Understand first, organize second, and verify everything. Do not begin implementing all the missing application features in this task. First complete the PDF analysis, existing project audit, folder organization, and documentation.

I will review your report before giving you the next implementation task.
Attached file: `C:\Users\user\Downloads\Edspire-Frontend-Technical-Challenge.pdf`
````

</details>

### Work performed

1. **PDF analysis**
   - Located the PDF at `C:\Users\user\Downloads\Edspire-Frontend-Technical-Challenge.pdf`.
   - The model could not ingest PDFs directly, so the text was extracted locally with
     `pdfjs-dist` in a temporary directory outside the project.
   - Read all **3 pages**, including overview, scope, APIs, all seven core requirements,
     design references, optional bonuses, and submission instructions.
   - No project dependency was added for PDF extraction.

2. **Existing project audit**
   - Inspected `package.json`, `vite.config.js`, `index.html`, `.gitignore`, `.oxlintrc.json`,
     `README.md`, `src/main.jsx`, `src/App.jsx`, `src/App.css`, `src/index.css`, and public assets.
   - Confirmed the app is React 19 + Vite 8 using JavaScript/JSX.
   - Identified that the entire dashboard was implemented in one 281-line `App.jsx` with static
     demo weather, a static five-day forecast, in-memory favourites capped at five, and a
     responsive sidebar drawer.
   - Confirmed there were **no API integrations**, no PWA configuration, no service worker,
     no persistence, and no validation.
   - Ran the baseline production build successfully.
   - Baseline lint reported four unused imports in `App.jsx` (`AnimatePresence`, `Plus`,
     `Navigation`, `CloudFog`).

3. **Requirement comparison**
   - Mapped all seven core PDF requirements against the existing implementation.
   - Recorded them as missing, partial, or implemented in `README.md`.

4. **Folder and component refactor**
   - Split the monolithic `App.jsx` into `MainLayout`, `Sidebar`, `Header`, `CurrentWeather`,
     `WeatherHighlights`, `Forecast`, `CitySearch`, and `FavoriteCities`.
   - Added `Dashboard` as the page composition layer and `useFavorites` for favourite state.
   - Preserved the original markup, CSS class names, theme, data, and interactions.
   - Added `src/styles/variables.css` and connected the palette to `index.css` and `App.css`
     without changing any colour values.
   - Removed the four unused imports.
   - Replaced the hardcoded hero date with a dynamically formatted current date.
   - Made the mobile drawer close after selecting a favourite city.
   - Changed the footer wording to explicitly state that the weather data is demo data.
   - Created `.env`, `.env.example`, and Git ignore rules for local environment files.
   - Updated `index.html` with the correct title, description, and theme colour.

5. **Documentation**
   - Rewrote `README.md` with setup, architecture decisions, API plan, current status,
     known limitations, deferred modules, design tokens, and the submission checklist.
   - Created this `PROMPTS.md`.

6. **Verification**
   - `npm run build` — passed.
   - `npm run lint` — passed with zero warnings and exit code 0.
   - Browser smoke test at the available desktop viewport — no console errors; theme tokens resolved
     to the original colours; city search updated the hero label; adding a favourite updated the
     sidebar; forecast selection changed the active card; no horizontal overflow at that viewport.
     The exact 375 / 768 / 1280 px viewports were not emulated in this phase.

### Key decisions

- **No new project and no stack change.** React + Vite + JavaScript was retained.
- **No dependencies installed in the project.** Existing packages were reused.
- **No application features implemented beyond the refactor.** API integration, autocomplete,
  validation, persistence, PWA, offline support, and notifications remain for later phases.
- **No files deleted.** Unused template assets and the existing favicon were retained.
- **No placeholder modules created.** Planned service, utility, common-state, manifest, and PWA
  icon files were deliberately deferred and documented in `README.md`.
- **Demo data clearly labelled.** `DEMO_WEATHER` and `DEMO_FORECAST` carry comments, and the
  footer tells the user that API integration is pending. No fake data is presented as live.
- **API keys are not in source.** `.env` contains empty placeholders and is Git-ignored;
  `.env.example` documents the variable names.

### Files created

- `src/components/layout/MainLayout.jsx`
- `src/components/layout/Sidebar.jsx`
- `src/components/layout/Header.jsx`
- `src/components/weather/CurrentWeather.jsx`
- `src/components/weather/WeatherHighlights.jsx`
- `src/components/weather/Forecast.jsx`
- `src/components/search/CitySearch.jsx`
- `src/components/favorites/FavoriteCities.jsx`
- `src/pages/Dashboard.jsx`
- `src/hooks/useFavorites.js`
- `src/styles/variables.css`
- `.env`
- `.env.example`

### Files modified

- `src/App.jsx` — reduced to the application shell; previous UI moved into components.
- `src/index.css` — imports the token file and uses design tokens.
- `src/App.css` — original styles retained; palette, radius, and shadow values tokenised.
- `index.html` — title, description, and theme colour.
- `.gitignore` — ignores `.env` files while keeping `.env.example`.
- `README.md` — replaced the default Vite template README with project documentation.
- `PROMPTS.md` — created and populated with this session.

### Files moved or deleted

- No files were deleted.
- The contents of `src/App.jsx` were redistributed into the new components; the file itself
  remains as the top-level shell.

### Issues discovered and resolved

- Four unused imports caused lint warnings — removed.
- The hero date was hardcoded to 14 November 2026 — now generated from the current date.
- Selecting a favourite on mobile left the drawer open — the drawer now closes.
- The footer did not clearly distinguish demo data from API data — wording updated.
- `.env` was not ignored by Git — ignore rules added.

### Issues discovered but not resolved (deferred by scope)

- All weather values and forecasts are static demo data.
- City search changes only the city label; no GeoDB autocomplete or debounce.
- No validation, loading states, or API error handling.
- Favourites are in memory only; no `localStorage`, confirmation, or unavailable-storage fallback.
- No PWA manifest, icons, service worker, offline banner, or push notifications.
- Sidebar navigation and header notification controls are inert.
- Exact 375 / 768 / 1280 px behaviour and 44×44 px touch targets have not been audited.
- The favicon and several template assets are unused or off-brand; retained without approval to delete.
  This includes `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, and
  `public/icons.svg`.
- No deployment, no public GitHub repository, and no Git repository in the working copy.

### Next prompt

Not yet submitted. The recommended next phase is documented in `README.md`:
city autocomplete and the real weather data layer.
---

# Prompt-2: Core Features Implementation

| Field | Value |
| --- | --- |
| Date executed | 14 November 2026 |
| Status | Core implementation complete; submission items outstanding (deployment and public repository) |
| Session | Session 2 — real data, search, forecast, favourites, PWA, notifications |

## Prompt submitted (verbatim)

<details>
<summary>Expand the full Prompt-2 text</summary>

````text
# PROMPT-2: WeatherBoard — Core Features Implementation

## 1. Your Role

Continue working as the primary AI development agent for my existing WeatherBoard project.

In Prompt-1, you were instructed to analyze the Edspire assessment PDF, audit the existing project, organize the folder structure, and prepare project documentation.

Now your responsibility is to implement the actual application requirements professionally.

Do not start from scratch. Continue from the existing project and use the folder structure established in Prompt-1.

## 2. Review Before Implementation

Before writing code:

1. Read the complete Edspire assessment PDF again if necessary.
2. Review your Prompt-1 analysis and implementation report.
3. Inspect the current project files.
4. Check the existing React components and functionality.
5. Review package.json and available dependencies.
6. Read PROMPTS.md to understand the previous development history.

Create a checklist of all mandatory PDF requirements.

Classify each requirement as:

- Already implemented.
- Partially implemented.
- Not implemented.
- Not applicable.

Do not duplicate existing functionality.

## 3. Implement All Required Core Features

Implement the missing mandatory features specified in the PDF.

Prioritize the following areas whenever they are required by the assessment:

### A. Real Weather Data Integration

- Integrate the weather API specified or permitted by the PDF.
- Create reusable API service functions.
- Fetch actual weather information.
- Display current temperature and weather conditions.
- Display other required weather information.
- Handle loading, API failures, invalid responses, and network errors.
- Use environment variables for API credentials.
- Provide an appropriate .env.example file.

Never present hardcoded mock weather information as real API data.

### B. City Search

- Implement functional city search.
- Add autocomplete if required by the PDF.
- Allow users to select a city.
- Fetch weather information for the selected city.
- Handle empty input and invalid city names.
- Add appropriate loading and error states.

### C. Weather Forecast

- Implement the forecast functionality specified in the PDF.
- Display actual forecast information from the API.
- Organize forecast information into reusable React components.
- Ensure dates, temperatures, and weather conditions are displayed correctly.

### D. Favorite Cities

If required by the PDF:

- Allow users to add and remove favorite cities.
- Persist favorites using localStorage.
- Restore favorites after refreshing the browser.
- Prevent duplicate favorite entries.
- Respect any maximum favorites limit specified in the PDF.

### E. Validation and Error Handling

Implement appropriate validation for:

- Empty search input.
- Invalid city names.
- API failures.
- Network errors.
- Missing API configuration.
- Unexpected API responses.

Provide clear and user-friendly messages.

### F. Offline and PWA Functionality

If specified in the PDF:

- Configure the PWA manifest.
- Configure the required application icons.
- Implement the required service worker functionality.
- Support the specified offline experience.
- Avoid displaying stale information as live weather.
- Verify installation behavior and offline behavior.

Do not add optional PWA features that conflict with the assessment requirements.

## 4. UI and Design Requirements

Preserve the existing WeatherBoard design.

Existing visual identity:

- Background: #0B1220
- Card background: #111C2D
- Accent: #38BDF8
- Typography: Inter

Maintain:

- Professional dark dashboard appearance.
- Consistent spacing and typography.
- Readable weather information.
- Reusable cards and components.
- Smooth and appropriate interactions.
- Responsive layouts.

Do not replace the existing UI with a completely different design.

Improve the existing components where necessary.

## 5. Code Quality

Follow these development rules:

- Use React with JavaScript (.jsx/.js).
- Use reusable functional components.
- Use appropriate React hooks.
- Separate API logic from UI components.
- Avoid unnecessary code duplication.
- Use clear and meaningful naming.
- Keep components maintainable.
- Clean up unused imports and code.
- Avoid unnecessary dependencies.
- Do not introduce TypeScript.
- Do not expose API secrets.

Follow the folder structure established in Prompt-1.

If a new file or folder is necessary, create it in the appropriate location.

## 6. Preserve Existing Functionality

Do not:

- Delete existing working features.
- Replace the entire App.jsx unnecessarily.
- Break the existing layout.
- Change the project technology stack.
- Create a second React project.
- Add fake functionality just to make the application appear complete.

Before modifying an existing component, understand its current responsibilities.

## 7. Testing During Implementation

After implementing each major feature:

1. Check its imports and dependencies.
2. Verify that the component works.
3. Check the browser console for errors.
4. Test the relevant interactions.
5. Check that existing features still work.

Do not wait until the end to discover avoidable errors.

Run the available build command after implementation.

Fix errors introduced by your changes and report unrelated pre-existing issues separately.

## 8. Update PROMPTS.md

This is mandatory.

Open the existing root-level PROMPTS.md file.

Append this entire instruction as:

# Prompt-2: Core Features Implementation

Include:

- Complete Prompt-2 text.
- Date of execution.
- Features implemented.
- Files created or modified.
- Dependencies added, if any.
- Issues discovered and resolved.
- Remaining incomplete requirements.

IMPORTANT:

- Never delete Prompt-1.
- Never overwrite the existing PROMPTS.md content.
- Never create PROMPTS-2.md or another prompt-history file.
- Keep all prompts in the same PROMPTS.md.
- Maintain chronological numbering: Prompt-1, Prompt-2, Prompt-3, etc.
- Record only work actually completed.
- Do not claim that an incomplete feature is finished.

## 9. Final Implementation Report

When finished, provide:

1. Features successfully implemented.
2. Features partially implemented.
3. Features still missing.
4. API integration details.
5. Files created or modified.
6. Dependencies installed.
7. Build verification results.
8. Any known issues.
9. A recommended next step for Prompt-3.

## Final Instruction

Implement the mandatory requirements from the Edspire PDF carefully and professionally.

Prioritize functional correctness, clean code, reliable API integration, and preservation of the existing WeatherBoard design.

Do not skip requirements.

Do not fabricate successful test results.

Update the existing PROMPTS.md with Prompt-2 and its actual implementation history.

Complete this phase before proceeding to Prompt-3.
````

</details>

## Implementation summary

The existing Phase-1 dashboard shell was extended rather than replaced. All weather values now come
from the live Open-Meteo API, with explicit saved/offline fallbacks that are labelled as not live.
The dark navy/cyan visual identity and Inter typography were preserved.

### Features implemented

1. **Live weather data (Open-Meteo)** — keyless `https://api.open-meteo.com/v1/forecast` request
   for current conditions plus a five-day daily forecast. Responses are validated and normalised
   into `{ source, fetchedAt, timezone, city, current, daily }`; non-OK statuses, malformed JSON,
   and unexpected shapes raise typed errors that the UI renders as retryable messages.
2. **City autocomplete and search** — 300 ms debounced search from the header search box.
   GeoDB (RapidAPI) is used when `VITE_RAPIDAPI_KEY` is present; otherwise the Open-Meteo
   geocoding endpoint is used. Results appear in a keyboard-navigable combobox (Arrow keys, Enter,
   Escape), and selecting a result loads that city's weather. Empty, short, and over-long queries
   are validated on blur and on submit.
3. **Five-day forecast** — reusable `Forecast` component renders five real daily entries with
   weekday label, condition icon, and high/low temperatures.
4. **Current conditions and highlights** — reusable `CurrentWeather` and `WeatherHighlights`
   components show temperature, feels-like, condition, humidity, wind, visibility, sunrise, and
   sunset from the API, with units and local observation time.
5. **Favourite cities** — add/remove up to five favourites, persisted in `localStorage` and restored
   on refresh. Duplicates are rejected using city identity plus coordinate tolerance; removing a
   favourite requires confirmation; storage failure falls back to an in-memory store with a notice.
6. **Loading, empty, and error states** — skeleton loading UI, no-results messaging, offline banner,
   saved-data "stale" banner, and retry actions. Missing configuration is reported explicitly.
7. **PWA and offline support** — `vite-plugin-pwa` manifest with `display: standalone`,
   `theme_color: #0B1220`, 192 px and 512 px PNG icons (including a maskable entry), app-shell
   precaching, service-worker registration, and last-viewed-city weather saved by the app.
   Weather API responses are deliberately **not** cached by the service worker, so a cached API
   response can never be presented as a live reading.
8. **Daily reminder notifications** — explainer-first settings dialog, user-selected reminder time,
   permission request only after the user opts in, graceful handling of unsupported and denied
   permission, a test notification action, and best-effort scheduling through the page and service
   worker (including periodic background sync where supported).
9. **Responsive layout and accessibility** — verified at 375 px, 768 px, and 1280 px with no
   horizontal overflow; mobile sidebar drawer with overlay and close control; interactive controls
   sized to at least 44×44 px on mobile; dialog focus handling; ARIA labels on icon-only controls.
10. **Documentation** — `.env.example` for configuration, production README with setup, architecture,
    limitations, and verification results, and this prompt history.

### Partial or environment-dependent features

- **GeoDB / RapidAPI autocomplete** — the code path is implemented, but no RapidAPI key is
  configured, so only the Open-Meteo fallback was exercised live.
- **Notification delivery while the app is fully closed** — scheduling is best-effort. A service
  worker timer and periodic sync are attempted, but browsers may suspend background timers, so
  closed-tab delivery is not guaranteed.
- **Deployment and public repository** — the app was verified locally via `vite preview`; no public
  deployment URL or GitHub repository exists yet.

## Files created

| File | Purpose |
| --- | --- |
| `.env.example` | Documents `VITE_RAPIDAPI_KEY`, `VITE_GEODB_BASE_URL`, and `VITE_OPEN_METEO_BASE_URL` without secrets. |
| `src/services/weatherService.js` | Open-Meteo request, validation, normalisation, typed errors. |
| `src/services/cityService.js` | GeoDB and Open-Meteo geocoding, normalisation, debounce constant. |
| `src/services/notificationService.js` | Permission helpers, reminder scheduling, service-worker messaging. |
| `src/hooks/useWeather.js` | Live fetch, retry, cancellation, saved-weather fallback. |
| `src/hooks/useCitySearch.js` | Debounced search, validation, combobox state. |
| `src/hooks/useFavorites.js` | Favourite persistence, limit, deduplication, confirmation helpers. |
| `src/hooks/useNotifications.js` | Reminder settings, permission state, scheduling. |
| `src/hooks/useOnlineStatus.js` | Online/offline event tracking. |
| `src/utils/cities.js` | Default city/favourites, city identity comparison, validation. |
| `src/utils/storage.js` | Safe `localStorage` access with in-memory fallback and storage keys. |
| `src/utils/validation.js` | City query and reminder-time validation. |
| `src/utils/format.js` | Date, clock, day-label, and visibility formatting. |
| `src/utils/weatherCodes.js` | WMO weather-code to label/icon mapping. |
| `src/components/search/CitySearch.jsx` | Autocomplete combobox UI and keyboard interaction. |
| `src/components/favorites/FavoriteCities.jsx` | Favourite list and add/remove controls. |
| `src/components/weather/CurrentWeather.jsx` | Hero current-conditions card. |
| `src/components/weather/WeatherHighlights.jsx` | Detail tiles for secondary metrics. |
| `src/components/weather/Forecast.jsx` | Five-day forecast cards. |
| `src/components/weather/WeatherIcon.jsx` | Weather condition icon mapping. |
| `src/components/notifications/NotificationSettings.jsx` | Reminder settings dialog. |
| `src/components/ui/ConfirmDialog.jsx` | Accessible confirmation dialog. |
| `src/components/ui/ErrorMessage.jsx` | Reusable error state with retry. |
| `src/components/ui/Loading.jsx` | Skeleton loading states. |
| `src/components/ui/OfflineBanner.jsx` | Offline/stale banner. |
| `src/components/ui/Toast.jsx` | Short-lived status messages. |
| `public/notification-sw.js` | Service-worker reminder timer and notification display. |
| `public/icons/pwa-192.png`, `public/icons/pwa-512.png` | Valid PWA icons. |
| `scripts/generate-pwa-icons.ps1` | Deterministic icon generation script. |

## Files modified

| File | Change |
| --- | --- |
| `src/pages/Dashboard.jsx` | Replaced demo dashboard composition with live data, search, favourites, offline, and dialog orchestration. |
| `src/components/layout/Header.jsx` | Wired search, live/offline status, and reminder settings button. |
| `src/components/layout/Sidebar.jsx` | Favourite cities, mobile drawer controls. |
| `src/components/layout/MainLayout.jsx` | Offline banner, toasts, dialogs, responsive shell. |
| `src/App.jsx` | Delegates to the dashboard page while keeping the application shell. |
| `src/main.jsx` | Registers the PWA service worker. |
| `src/App.css` | Styles for new components, PWA/offline states, dialogs, responsive layout, and mobile touch targets. |
| `index.html` | Manifest/theme metadata and apple-touch-icon. |
| `vite.config.js` | PWA manifest, icons, precache, geocoding/GeoDB runtime caching, notification service-worker import. |
| `README.md` | Replaced Phase-1 text with production documentation. |
| `PROMPTS.md` | Prompt-1 preserved; Prompt-2 appended in this single file. |

No files were deleted. The unused template assets retained in Phase 1 were left in place.

## Dependencies added

**None.** All features were implemented with the existing dependencies (`react`, `react-dom`,
`vite`, `vite-plugin-pwa`, `lucide-react`, `@fontsource/inter`, `oxlint`). No TypeScript was added.

## Issues discovered and resolved

- The original dashboard showed static demo weather, which would have been indistinguishable from
  live data — replaced with API-backed values.
- A `NetworkFirst` service-worker cache for the weather API could return a cached response that
  looked live — removed that route; saved weather is now app-managed and explicitly labelled.
- Duplicate favourites could be added when the same city came from different providers — identity
  comparison now includes name/country plus a coordinate tolerance.
- Storage could throw in private mode or when disabled — added safe reads/writes with an in-memory
  fallback and user notice.
- The header search had no keyboard interaction — added Arrow/Enter/Escape handling and proper
  combobox roles.
- Mobile drawer controls and some search controls were below the 44×44 px target — mobile
  min-sizes added and re-verified.
- The reminder dialog requested permission without context — added an explainer and an explicit
  opt-in step.
- The service-worker reminder date key used UTC, which could suppress or repeat reminders near
  midnight — switched to a local date key and preserved `lastNotifiedDate` when rescheduling.
- Search blur only reported empty input — now reports all validation failures.

## Verification performed

- `npm run build` succeeds (production bundle, 50 precache entries, `dist/sw.js` generated).
- `npm run lint` passes with two expected `react(set-state-in-effect)` warnings in
  `useCitySearch.js` and `useWeather.js`; no errors.
- Manual browser verification: live weather for Karachi, London, Paris, and Tokyo; autocomplete and
  keyboard selection; favourite add/remove/limit/duplicate/persistence behavior; confirmation
  dialog; offline banner and saved-weather labelling; recovery to live data; notification dialog
  states including denied permission; layout checks at 375/768/1280 px.
- No automated test suite exists in the project, and no automated tests were claimed.

## Remaining incomplete requirements

- Public deployment URL (Vercel/Netlify or similar) is still required and not yet created.
- Public GitHub repository is still required; the working copy is not a Git repository.
- GeoDB/RapidAPI search path has not been verified against a live key.
- Guaranteed notification delivery while the browser/PWA is fully closed cannot be provided by
  standard web APIs and remains best-effort.

## Recommended next step (Prompt-3)

Deploy the production build, create the public repository, capture final screenshots and install
evidence, verify the GeoDB path with a real key if available, and finalise the submission package.
