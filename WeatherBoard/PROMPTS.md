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

---

# Prompt-3: Professional UI/UX, Complete Testing & Submission Preparation

| Field | Value |
| --- | --- |
| Date executed | 14 November 2026 |
| Status | Implementation, verification, and documentation complete; deployment and public repository outstanding |
| AI IDE | OpenCode Desktop |
| Agent | OpenCode coding agent (model: Big Pickle) |
| Session | Session 3 — UI/UX polish, full feature/PWA/security audit, final documentation |

## Prompt submitted (verbatim)

<details>
<summary>Expand the full Prompt-3 text</summary>

````text
# PROMPT-3: WeatherBoard — Professional UI/UX, Complete Testing & Submission Preparation

## 1. Your Role

Continue as the primary AI development agent for my existing WeatherBoard project.

This is the final development and quality-assurance phase before I personally deploy and submit the application to Edspire.

The previous development phases were:

- Prompt-1: Project Understanding, PDF Analysis & Folder Structure.
- Prompt-2: Core Features Implementation.

Now complete the remaining work in one carefully managed phase.

**Important:** I want the application fully implemented, polished, tested, and prepared for deployment. I will handle the actual hosting and deployment myself.

Do not create a new project or replace the existing application.

## 2. Review the Complete Project History

Before making changes:

1. Read the complete Edspire assessment PDF.
2. Read the existing PROMPTS.md.
3. Review Prompt-1 and Prompt-2 implementation records.
4. Inspect the complete current project structure.
5. Inspect all React components, services, hooks, styles, and configuration files.
6. Review package.json and installed dependencies.
7. Check the current API integrations and environment configuration.
8. Identify unfinished features, errors, and technical limitations.

Do not assume that a feature was successfully implemented just because a previous report says it was.

Verify everything against the actual source code.

## 3. Professional UI/UX Improvements

Improve the existing WeatherBoard interface while preserving its established design identity.

Existing theme:

- Background: #0B1220
- Card background: #111C2D
- Accent: #38BDF8
- Typography: Inter

The application should feel like a polished, professional consumer weather product.

Study the design principles of:

- Linear — typography, spacing, empty states.
- Vercel Dashboard — clean dashboard layout.
- Stripe — clear validation and error feedback.
- Mercury — professional information hierarchy.
- Modern weather dashboards — forecast cards and weather visualization.

Do not copy these websites.

### Improve the following:

- Dashboard layout and visual hierarchy.
- Sidebar and navigation consistency.
- Search field and autocomplete presentation.
- Weather cards and forecast presentation.
- Favourite cities panel.
- Button styles and interaction states.
- Icons and weather condition visuals.
- Typography, spacing, and alignment.
- Empty states.
- Loading states and skeletons where appropriate.
- API error messages.
- Offline mode banner.
- Notification settings interface.
- Mobile navigation and touch interactions.

Keep the design clean, readable, consistent, and professional.

Do not introduce unnecessary animations or visual effects.

## 4. Responsive Design Verification

The application must work correctly at these exact viewport widths:

- Mobile: 375px.
- Tablet: 768px.
- Desktop: 1280px.

Check:

- No horizontal scrolling.
- No overlapping cards.
- No clipped text.
- No broken navigation.
- No inaccessible buttons.
- No overflowing forecast sections.
- Proper spacing on small screens.
- Touch targets at least 44×44px on mobile.

Fix all responsive issues you discover.

Do not consider the application responsive merely because CSS media queries exist. Verify the actual layouts.

## 5. Complete Core Feature Verification

Verify every mandatory feature from the Edspire PDF.

### A. City Search and Autocomplete

- Verify GeoDB Cities API integration.
- Verify live suggestions while typing.
- Verify the 300ms debounce requirement.
- Verify city selection.
- Verify no-results state.
- Verify API failure state.
- Verify empty input validation.
- Verify validation on blur.
- Prevent unnecessary duplicate API requests.

### B. Weather Data

- Verify OpenWeatherMap integration.
- Verify actual current weather data.
- Verify temperature, humidity, wind speed, and condition icons.
- Verify the five-day forecast.
- Verify correct city and location information.
- Verify loading and error states.
- Verify Open-Meteo fallback when the primary API fails or is rate-limited.

Do not display mock data as actual weather.

### C. Favourite Cities

- Maximum five favourite cities.
- Save favourites in localStorage.
- Restore favourites after refresh.
- Prevent duplicates.
- Verify removal confirmation.
- Handle unavailable localStorage gracefully.
- Verify quick access to saved cities.

### D. Form Validation

Verify:

- Empty city input.
- Invalid city.
- No API results.
- Network failure.
- API errors.
- Clear inline error messages.
- Validation on blur and submit.

Never use a generic "Something went wrong" message when the actual problem can be identified.

### E. Progressive Web App

Verify:

- Valid web manifest.
- Correct application name.
- 192px icon.
- 512px icon.
- Correct theme_color.
- display: standalone.
- Service worker registration.
- Application shell caching.
- Last-viewed city weather caching.
- Offline mode banner.
- Offline access to the last cached city.
- Recovery when the internet connection returns.

Do not claim offline weather updates are available when the device has no internet connection.

## 6. Push Notifications — Important Technical Requirement

The Edspire assessment requires a daily morning weather reminder that can fire even when the application tab is closed.

Implement the strongest technically valid solution compatible with the assessment's client-side-only restriction.

First, inspect whether the current implementation supports actual Web Push.

Important technical rules:

- Explain the notification purpose before requesting browser permission.
- Request permission only after an explicit user action.
- Allow the user to choose a reminder time.
- Use a service worker for persistent notification display.
- Handle unsupported browsers gracefully.
- Handle denied permissions without breaking the rest of the application.
- Allow users to enable, disable, and update their reminder settings.
- Do not request notification permission automatically on page load.

**Critical limitation:**

The Notifications API alone cannot guarantee a daily scheduled notification while the application is closed.

Reliable Web Push delivery requires a push message sender, such as a server-side sender or a supported third-party push service. A service worker cannot independently wake itself every morning and generate a reliable scheduled push notification.

Therefore:

1. Investigate whether a genuinely free, assessment-compatible third-party push solution is available.
2. Do not create a backend server because this assessment specifies client-side-only development.
3. Do not introduce paid services without my approval.
4. Do not claim that a local timer, setInterval, or Periodic Background Sync is equivalent to reliable daily Web Push.
5. If full closed-tab scheduling is impossible under the permitted architecture, implement the best honest client-side notification experience, provide an appropriate fallback, and document the limitation clearly.
6. Do not fabricate successful background push tests.

Keep the rest of the application functional even if notifications are unsupported.

## 7. API and Environment Security

Inspect the project's environment setup.

Expected variables may include:

- VITE_OPENWEATHER_API_KEY
- VITE_RAPIDAPI_KEY
- VITE_RAPIDAPI_HOST

Use only the variables actually needed by the implementation.

Requirements:

- Keep actual local credentials inside .env.
- Ensure .env is ignored by Git.
- Maintain .env.example with placeholder values only.
- Never write actual API keys into source files.
- Never print actual API keys in the final report.
- Never commit secrets.
- Explain that VITE_ environment variables are exposed in the browser bundle and are not private secrets.

Do not change valid API configuration unnecessarily.

## 8. Browser and Functional Testing

Perform a structured testing pass.

Test the following:

1. Application startup.
2. Initial dashboard rendering.
3. City search.
4. Autocomplete suggestions.
5. City selection.
6. Current weather loading.
7. Five-day forecast.
8. OpenWeatherMap API failure.
9. Open-Meteo fallback.
10. Invalid city handling.
11. Empty search validation.
12. Favourite city addition.
13. Favourite city removal confirmation.
14. Maximum five favourites.
15. localStorage persistence.
16. localStorage unavailable behavior.
17. Offline mode.
18. Cached last-viewed city.
19. PWA installation configuration.
20. Notification permission handling.
21. Responsive layout at 375px, 768px, and 1280px.
22. Browser console errors.
23. Broken imports and missing assets.

Use the available browser automation or testing tools if configured.

If browser automation is unavailable, use the available build, unit, and manual verification methods.

Do not claim that you visually tested a browser viewport unless you actually did.

## 9. Build and Bug Fixing

Run the project's appropriate commands.

At minimum:

- Install missing dependencies only when necessary.
- Run npm run build.
- Run available lint checks.
- Run available automated tests.
- Fix errors caused by your changes.
- Check for broken imports.
- Check for missing files.
- Check for unused or unnecessary dependencies.

If a test command does not exist, report that rather than inventing a passing result.

The final production build must succeed before you declare the project ready.

Do not hide warnings or unrelated pre-existing issues.

## 10. README.md — Final Documentation

Create or update the root-level README.md.

Include:

1. Project overview.
2. Main features.
3. Technologies used.
4. APIs used and their purposes.
5. Project folder structure.
6. Installation instructions.
7. Local development commands.
8. Environment variable setup.
9. Build instructions.
10. PWA and offline functionality.
11. Notification functionality and limitations.
12. Architecture decisions.
13. Known limitations.
14. Testing performed.
15. Deployment instructions for Vercel or Netlify.
16. A placeholder for the final live application URL.

Do not invent a live URL. I will add it after deployment.

## 11. GitHub and Submission Preparation

Prepare the repository for a public GitHub submission.

Inspect:

- .gitignore.
- .env protection.
- .env.example.
- Unnecessary generated files.
- Debugging code.
- Temporary test files.
- Console logging.
- Unused dependencies.
- Missing documentation.

Do not delete existing files without understanding their purpose.

Do not push, publish, or deploy anything without my approval.

Do not run destructive Git commands.

I will personally handle:

- GitHub push.
- Vercel or Netlify hosting.
- Production environment variables.
- Final live URL.
- Email submission to jobs@edspire.app.

Provide the exact recommended commands and deployment steps in your final report.

## 12. PROMPTS.md — Mandatory Complete History

This requirement is extremely important.

Update the existing root-level PROMPTS.md.

Append this instruction as:

# Prompt-3: Professional UI/UX, Complete Testing & Submission Preparation

The same PROMPTS.md must contain the complete chronological history:

1. Prompt-1: Project Understanding, PDF Analysis & Folder Structure.
2. Prompt-2: Core Features Implementation.
3. Prompt-3: Professional UI/UX, Complete Testing & Submission Preparation.

For each prompt, preserve:

- Complete original prompt text.
- Date.
- AI IDE used: OpenCode Desktop.
- Actual work completed.
- Files created or modified.
- Testing results.
- Issues and limitations.

Rules:

- Never delete Prompt-1 or Prompt-2.
- Never overwrite the previous prompt history.
- Never create separate prompt-history files.
- Do not invent missing prompt text or results.
- Preserve the original order.
- Append Prompt-3 only after completing this phase.
- Record actual work, not planned work.

## 13. Final Project Report

After completing the work, provide a professional report with:

### A. UI/UX
- Improvements completed.
- Responsive testing results.

### B. Features
- All mandatory PDF requirements.
- Completed features.
- Partially completed features.
- Remaining limitations.

### C. APIs
- OpenWeatherMap status.
- GeoDB Cities status.
- Open-Meteo fallback status.
- API configuration issues, if any.

Never reveal actual API keys.

### D. PWA and Notifications
- Manifest status.
- Service worker status.
- Offline verification.
- Push notification implementation status.
- Any architectural limitations.

### E. Testing
- Build result.
- Lint result.
- Automated test result.
- Browser verification result.
- Responsive viewport results.

Clearly distinguish tests that passed, failed, were skipped, or could not be performed.

### F. Documentation and GitHub
- README.md status.
- PROMPTS.md status.
- .env and .gitignore status.
- Repository readiness.

### G. My Next Steps
Give me the exact commands and instructions I must follow to:

1. Run the application locally.
2. Push it to GitHub.
3. Deploy it using Vercel or Netlify.
4. Configure production environment variables.
5. Obtain the live URL.
6. Submit the project to Edspire.

## FINAL INSTRUCTIONS

This is the final development and testing phase.

Make the existing WeatherBoard application professional, functional, responsive, and ready for deployment.

Prioritize the Edspire PDF requirements over unnecessary extra features.

Do not waste time building optional bonus features until every mandatory requirement has been verified.

Do not create a backend.

Do not deploy or publish the application.

Do not expose API credentials.

Do not fabricate functionality or test results.

Preserve all previous work and maintain the complete prompt history in the same PROMPTS.md file.

Finish the implementation, verification, documentation, and final report before stopping.
````

</details>

## Implementation summary

Prompt-3 was treated as a verify-first phase: every claim from Prompt-1 and Prompt-2 was checked
against the source and the production build before it was documented. No feature was accepted just
because an earlier report said it worked.

### UI/UX improvements completed

- Removed the duplicated Settings entry from the sidebar navigation and made the remaining
  navigation coherent.
- Replaced the sidebar's vague promo card with honest, product-specific information.
- Improved the empty-favourites state, including clearer guidance and a search affordance.
- Added condition-aware icon tones through `src/utils/weatherTone.js`, so clear, cloudy, rain,
  snow, and storm states read differently without changing the established palette.
- Strengthened search presentation with a `focus-within` treatment, clear active/pressed states,
  and consistent hover/focus feedback on buttons and links.
- Improved forecast-card presentation and selection feedback.
- Made the app footer wrap cleanly and show the real active provider (`OpenWeatherMap`,
  `Open-Meteo`, or `Open-Meteo (backup)`).
- Rewrote the notification dialog copy to explain the reminder first, show the chosen time, show
  the next scheduled reminder, and state the closed-tab limitation plainly.
- Made the mobile drawer overlay a real accessible button and verified the drawer fits the
  viewport with a 44×44 px close control.
- Fixed colour-contrast failures by moving secondary text to `#8da0b6` on dark surfaces.
- Removed a forecast-card `aria-label` that conflicted with its visible text, resolving the
  label-in-name audit failure.
- Added `public/robots.txt` so the SEO audit sees a valid robots file.

### Feature verification completed

- **Search/autocomplete:** typing `L`, `Lo`, `Lon` produced exactly one Open-Meteo geocoding
  request after the 300 ms debounce, returned 8 suggestions, and selecting London loaded its live
  weather and five-day forecast.
- **Weather:** live Open-Meteo data verified for Karachi, London, Paris, and Tokyo. Current
  conditions, humidity, wind, visibility, sunrise/sunset, and five daily cards all rendered.
- **OpenWeatherMap:** implemented as an optional primary provider. Normalisation was verified with
  a local fixture (Karachi 24 °C, clear sky, 58 % humidity, 15 km/h wind, 8 km visibility, five
  days, source `OpenWeatherMap`). A 503 fixture verified the automatic Open-Meteo fallback and the
  `Open-Meteo (backup)` label. No live key was available, so the live OWM path remains unverified.
- **Favourites:** add/remove, toasts, `3/5 → 4/5 → 3/5` count updates, removal confirmation,
  duplicate prevention, and persistence after reload verified. Paris was added and then removed
  without residue.
- **Validation:** empty, short, over-long, no-results, network, and API failures keep specific
  inline messages; no generic “Something went wrong” copy was introduced.
- **Offline/PWA:** with the network forced offline, the app issued **0 weather requests**, showed a
  clear no-saved-weather state for London, showed `SAVED WEATHER` and `Not live · saved <time>` for
  Tokyo, and recovered automatically to `LIVE WEATHER` on `online`. The app shell also loaded from
  the service worker with the local origin server stopped.
- **Notifications:** the dialog explains the behaviour before permission, keeps permission denied
  until the explicit action, allows a user-chosen time (`07:00` default), exposes a test action,
  explains denied permission, and states that closed-tab delivery is not guaranteed. Notification
  Triggers were detected as unsupported and were not used.
- **Console:** no console errors on the final live dashboard, PWA, offline, or responsive checks.

### Responsive verification completed

A harness loaded the production build in same-origin iframes with `scrolling="no"` and exact
`width`/`height` attributes so the inner viewport was exactly the target width.

| Viewport | Inner/client width | Horizontal scroll | Forecast columns | Overlaps | Clipped text | Small targets |
| --- | --- | --- | --- | --- | --- | --- |
| 375 px | 375 px | None (`scrollWidth = 375`) | 2 | None | None | None (`< 44×44`) |
| 768 px | 768 px | None (`scrollWidth = 768`) | 3 | None | None | None |
| 1280 px | 1280 px | None (`scrollWidth = 1280`) | 5 | None | None | None |

The mobile drawer stayed inside the viewport, its overlay was a button labelled “Close navigation
menu”, its close control measured 44×44 px, and every drawer target met 44×44 px.

### Testing and build results

- `npm run build` — **passes**. Final output: JS 414.44 kB (133.02 kB gzip), CSS 35.00 kB
  (7.18 kB gzip), 50 precache entries (1,001.21 KiB), `dist/sw.js` generated.
- The 50 precache entries resolve to **45 unique URLs** because five assets appear in both
  `includeAssets` and `globPatterns`. This is expected and is not a build failure.
- `npm run lint` — **passes** with no errors and two intentional `react(set-state-in-effect)`
  warnings in `src/hooks/useWeather.js` and `src/hooks/useCitySearch.js`.
- Lighthouse on the production build — **Accessibility 100, Best Practices 100, SEO 100**, zero
  failing audits, zero console errors.
- PWA — service worker active and controlling, manifest `standalone` with `#0B1220`, real
  192×192/512×512 icons, `index.html`, `manifest.webmanifest`, and `notification-sw.js` in the
  precache, `/robots.txt` returning 200.
- **Automated tests:** none exist in the project and none are claimed. All verification above was
  browser automation, build, and lint work.

### Security and repository review

- `.env` remains Git-ignored; `.env.example` contains placeholders only.
- No API key was printed, copied into source, committed, or embedded in documentation.
- The README and `.env.example` now state explicitly that every `VITE_*` value is bundled into the
  public client and is not a private secret.
- Temporary test pages were kept out of the source tree; the final rebuild removed the temporary
  responsive harness from `dist/`.
- `dist/` and `node_modules/` remain Git-ignored.
- No Git repository, remote, deployment, or publication was created.

## Files created

| File | Purpose |
| --- | --- |
| `src/utils/weatherTone.js` | Maps weather-condition families to icon tone classes used by the current-weather and forecast visuals. |
| `public/robots.txt` | Valid `User-agent: *` / `Allow: /` file that satisfies the SEO audit. |

## Files modified

| File | Change |
| --- | --- |
| `src/services/weatherService.js` | Added optional OpenWeatherMap primary provider (`/weather` + `/forecast`), normalisation, local-day grouping, provider-specific errors, `isOpenWeatherConfigured()`, and automatic Open-Meteo fallback with `Open-Meteo (backup)` attribution. |
| `src/utils/weatherCodes.js` | Added `describeOpenWeather(code, isDay)` mapping for OpenWeatherMap condition IDs while preserving the WMO mapping. |
| `src/pages/Dashboard.jsx` | Provider-aware footer/attribution and current source orchestration. |
| `src/components/layout/Sidebar.jsx` | Removed duplicate Settings navigation; improved the sidebar information card. |
| `src/components/layout/MainLayout.jsx` | Accessible mobile overlay button and drawer interaction refinements. |
| `src/components/favorites/FavoriteCities.jsx` | Improved empty-favourites state and list presentation. |
| `src/components/notifications/NotificationSettings.jsx` | Added explicit closed-tab limitation and next-reminder copy; retained denied/unsupported handling. |
| `src/components/weather/Forecast.jsx` | Removed the accessible name that conflicted with visible card text. |
| `src/components/weather/CurrentWeather.jsx` | Condition-aware visual tone integration. |
| `src/components/ui/WeatherIcon.jsx` | Condition-aware icon tone integration. |
| `src/App.css` | UI polish, focus/active states, wrapping footer, accessible secondary colours (`#8da0b6`), responsive drawer and touch-target rules. |
| `src/index.css` | Supporting interaction/focus refinements. |
| `.env.example` | Documented `VITE_OPENWEATHER_API_KEY` and the public-bundle warning; retained GeoDB/Open-Meteo variables. |
| `README.md` | Rewritten for the final Prompt-3 state: OWM/fallback, Lighthouse results, PWA/offline evidence, testing, limitations, and deployment commands. |
| `PROMPTS.md` | Prompt-1 and Prompt-2 preserved; Prompt-3 appended in this same file. |

## Dependencies added

**None.** No package was installed, removed, or upgraded during Prompt-3. No backend, paid service,
TypeScript migration, or new project was introduced.

## Issues discovered and resolved

- The README described Open-Meteo as the only weather provider, which no longer matched the code —
  rewritten to document OpenWeatherMap optional primary and Open-Meteo fallback accurately.
- The sidebar repeated a Settings destination in the navigation — removed the duplicate.
- Low-contrast secondary text failed WCAG AA in Lighthouse — changed the affected colours to
  `#8da0b6`; Accessibility rose from 96 to 100.
- A forecast-card `aria-label` did not match its visible text — removed the conflicting label;
  the label-in-name audit now passes.
- Lighthouse reported an invalid/missing `robots.txt` — added a valid `public/robots.txt`; SEO
  rose from 80 to 100.
- The notification dialog mentioned limitations but not plainly enough — the closed-tab limitation
  and next-reminder time are now explicit.
- The responsive harness initially produced 360/753 px inner widths because iframe borders reduced
  the content box — switched to `scrolling="no"` exact-size frames and re-verified true
  375/768/1280 px viewports.
- Mobile drawer targets and the close control required another pass — confirmed 44×44 px and a
  viewport-fitting drawer.
- Temporary responsive-test HTML was generated inside `dist/` for verification — removed by the
  final clean production rebuild so it is not part of the handoff.

## Limitations and incomplete requirements

- **OpenWeatherMap live path unverified** — no real key was configured; only fixture-based
  normalisation and fallback were tested. Current production configuration is Open-Meteo-only.
- **GeoDB live path unverified** — no RapidAPI key was configured; only the Open-Meteo geocoding
  path was exercised live.
- **Closed-tab notifications cannot be guaranteed** under the client-only constraint. Page timers,
  a service-worker timer, and periodic sync are attempted as best effort; reliable delivery needs
  a Web Push sender, which this project deliberately does not include.
- **Granted-permission delivery untested** — the test browser's permission is `denied`; unsupported
  and denied states were verified, but a successful granted notification was not observed.
- **`localStorage`-unavailable path** is code-inspected only; it was not destructively simulated.
- **No deployment URL and no public GitHub repository** exist yet; the working copy is not a Git
  repository. Deployment and submission remain the owner's responsibility.
- Optional bonus features remain unimplemented by design.

## Recommended next step (post-Prompt-3)

Follow [Deployment and submission](README.md#deployment-and-submission) in the README: create
the public repository, push, deploy to Vercel or Netlify, configure optional `VITE_*` variables,
add the live URL to the README, and submit both links to `jobs@edspire.app`.
