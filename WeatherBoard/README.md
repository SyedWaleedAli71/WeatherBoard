# WeatherBoard

WeatherBoard is a responsive weather dashboard built with **React 19 + Vite** for the
**Edspire Frontend (React) Developer Technical Challenge (November 2026)**.

Search for a city, view live current conditions and a five-day forecast, save up to five
favourite cities, and opt in to a daily morning reminder. The production build is an installable
PWA that keeps working offline for the last-viewed city, while clearly labelling saved data as
not live.

> **Status:** all mandatory application features are implemented and verified locally. The public
> deployment URL and public GitHub repository — both required for submission — do not exist yet.
> See [Remaining submission items](#remaining-submission-items).

---

## Live URL

**Not deployed yet.** This section will be updated with the public URL once the app is deployed
to Vercel, Netlify, or a similar static host.

## Repository

The working copy is **not currently a Git repository**. A public GitHub repository is required
for submission and has not been created yet.

---

## Features

### Live weather data
- Current temperature, feels-like temperature, condition, humidity, wind speed, visibility,
  sunrise, and sunset, plus the local observation time.
- Five-day forecast with weekday labels, condition icons, and daily highs and lows.
- Data is fetched from **Open-Meteo**, which is free and keyless.
- Every response is validated and normalised before use. Non-OK statuses, malformed JSON, request
  timeouts, and unexpected response shapes produce user-readable, retryable errors.
- Loading skeletons, empty states, API errors, network errors, and retry actions are handled.

### City search and autocomplete
- Debounced (300 ms) search as you type, with stale request cancellation.
- Keyboard-navigable combobox: Arrow Up/Down, Enter to select, Escape to close.
- **GeoDB Cities via RapidAPI** is used when `VITE_RAPIDAPI_KEY` is configured; otherwise the app
  falls back to the keyless **Open-Meteo Geocoding API**.
- Empty, too-short, and too-long queries are validated on blur and on submit with inline messages.
- No-results and search-failure states are shown in the dropdown.

### Favourite cities
- Up to **five** favourites, persisted in `localStorage` and restored on reload.
- Duplicate entries are prevented (same name/country with coordinates within ~0.25° is treated as
  the same city).
- Removal requires confirmation; the cap is explained when reached.
- If `localStorage` is unavailable (private mode, quota, disabled), the app falls back to an
  in-memory store and tells the user that favourites will not survive a refresh.

### PWA and offline support
- Valid web app manifest: `display: standalone`, `theme_color: #0B1220`, `background_color:
  #0B1220`, `start_url` and `scope` set, and 192 px + 512 px PNG icons (including a maskable entry).
- Service worker precaches the app shell (HTML, CSS, JS, fonts, icons) and uses a navigation
  fallback so the app opens offline.
- Last-viewed city and its weather are saved by the app. When offline, the UI shows:
  - an offline banner,
  - a `SAVED WEATHER` badge,
  - a `Not live · saved <time>` timestamp,
  - a saved-data footer and a "Retry live weather" action.
- The app never labels saved or cached weather as live. **Weather API responses are intentionally
  not cached by the service worker**, so a cached API response cannot masquerade as a live reading.
- Coming back online automatically refreshes the active city and restores the live state.

### Daily reminder notifications
- Reminder settings open in a dialog that explains exactly what will be sent **before** the
  browser permission prompt appears.
- The user chooses the reminder time; the default is `07:00`.
- Unsupported browsers and denied/blocked permission are handled gracefully, with instructions to
  re-enable notifications and no impact on the rest of the app.
- A "Send test" action verifies delivery while the app is running.
- Scheduling is best-effort via a page timer, a service-worker timer, and periodic background sync
  where the browser supports it. See [Notification limitations](#notification-limitations).

### Responsive layout and accessibility
- Verified at **375 px, 768 px, and 1280 px** with no horizontal overflow.
- Mobile sidebar drawer with overlay and a close control; the drawer closes after choosing a city.
- Interactive controls are at least **44×44 px** on mobile.
- Combobox, dialog, and icon-only controls have appropriate ARIA labels and focus handling.
- The dark navy/cyan visual identity and Inter typography are preserved throughout.

---

## PDF requirements and status

| # | Requirement | Status |
| --- | --- | --- |
| 01 | City search with live autocomplete, results within 300 ms, empty/error states | **Implemented** — GeoDB primary, Open-Meteo fallback; GeoDB path unverified without a key |
| 02 | Real current conditions and five-day forecast, with loading and error states | **Implemented** — live Open-Meteo data, validated and normalised |
| 03 | Client-side validation on blur and submit, inline actionable messages | **Implemented** — empty, short, and over-long queries |
| 04 | Up to five favourites in `localStorage`, quick access, removal confirmation, graceful degradation | **Implemented** — persistence, dedupe, cap, confirmation, memory fallback |
| 05 | Installable PWA: manifest, service worker, app-shell caching, last-city offline support, offline banner | **Implemented** — verified locally; saved data always labelled as not live |
| 06 | Daily morning reminder with user-chosen time, permission explanation, fallback | **Implemented (best-effort delivery)** — closed-tab delivery cannot be guaranteed by browsers |
| 07 | Responsive at 375 / 768 / 1280 px, no horizontal scroll, 44×44 px touch targets | **Implemented** — verified via iframe harness at all three widths |
| 08 | Public deployment URL and public GitHub repository | **Missing** — required for submission |
| 09 | `README.md` and `PROMPTS.md` documentation | **Implemented** — this file and the single root `PROMPTS.md` |

### Optional bonus features (not implemented)

- Dark/light theme toggle with system preference detection.
- Celsius/Fahrenheit toggle persisted across sessions.
- Animated Lottie or CSS weather-condition icons.

These were not required by the assessment and were skipped to keep scope focused on mandatory
correctness.

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 8 |
| Language | JavaScript / JSX (no TypeScript) |
| Styling | Plain CSS with design tokens |
| Animation | `motion` (Framer Motion API) |
| Icons | `lucide-react` |
| Typography | Inter via `@fontsource/inter` |
| PWA | `vite-plugin-pwa` (Workbox `generateSW`) |
| Linting | Oxlint |

The following packages were already present and remain installed but unused:
`gsap`, `lenis`, `react-type-animation`, and `@lottiefiles/dotlottie-react`. They were left
untouched rather than removed without approval.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
# PowerShell:
Copy-Item .env.example .env
# macOS/Linux:
# cp .env.example .env

# 3. (Optional) add a RapidAPI key for GeoDB autocomplete
#    Without it, the keyless Open-Meteo geocoding API is used.

# 4. Start the development server
npm run dev

# 5. Build and preview the production PWA
npm run build
npm run preview
```

The dev server runs at `http://localhost:5173` by default; `npm run preview` serves the production
build at `http://localhost:4173`.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production build in `dist/` (including the service worker) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

### Environment variables

Only variables prefixed with `VITE_` are exposed to the browser. `.env` is Git-ignored;
`.env.example` documents the supported names and contains no secrets.

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_RAPIDAPI_KEY` | No | GeoDB Cities via RapidAPI for primary autocomplete. When empty, Open-Meteo geocoding is used. |
| `VITE_OPEN_METEO_BASE_URL` | No | Override the Open-Meteo forecast base URL (default `https://api.open-meteo.com/v1/forecast`). |
| `VITE_GEODB_BASE_URL` | No | Override the GeoDB base URL (default `https://wft-geo-db.p.rapidapi.com/v1/geo`). |

Open-Meteo weather data requires **no key**. No API secrets are committed or bundled into the
production output.

---

## APIs

| API | Purpose | Authentication | Notes |
| --- | --- | --- | --- |
| [Open-Meteo Forecast](https://open-meteo.com/) | Current conditions + five-day daily forecast | None | Primary weather source. Requests temperature, humidity, apparent temperature, day/night, weather code, wind, visibility, daily min/max, sunrise, sunset. |
| [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api) | City search fallback | None | Used when no RapidAPI key is configured. |
| [GeoDB Cities (RapidAPI)](https://rapidapi.com/wirefreethought/api/geodb-cities) | City search primary | `X-RapidAPI-Key` from `VITE_RAPIDAPI_KEY` | Verified by code path only; not exercised live because no key was configured. |
| Browser Notifications + Service Worker | Daily reminder | None | Permission is requested only after explicit opt-in. |

---

## Architecture

```text
WeatherBoard/
├── public/
│   ├── icons/
│   │   ├── pwa-192.png          # PWA icon (192×192)
│   │   └── pwa-512.png          # PWA icon (512×512, also used as maskable)
│   ├── favicon.svg              # Existing asset, retained
│   ├── icons.svg                # Existing unused asset, retained
│   └── notification-sw.js       # Reminder timer + notification display
├── scripts/
│   └── generate-pwa-icons.ps1   # Regenerates the PNG icons
├── src/
│   ├── components/
│   │   ├── favorites/FavoriteCities.jsx
│   │   ├── layout/{Sidebar,Header,MainLayout}.jsx
│   │   ├── notifications/NotificationSettings.jsx
│   │   ├── search/CitySearch.jsx
│   │   ├── ui/{ConfirmDialog,ErrorMessage,Loading,OfflineBanner,Toast,WeatherIcon}.jsx
│   │   └── weather/{CurrentWeather,WeatherHighlights,Forecast}.jsx
│   ├── hooks/
│   │   ├── useCitySearch.js
│   │   ├── useFavorites.js
│   │   ├── useNotifications.js
│   │   ├── useOnlineStatus.js
│   │   └── useWeather.js
│   ├── pages/Dashboard.jsx
│   ├── services/
│   │   ├── cityService.js
│   │   ├── notificationService.js
│   │   └── weatherService.js
│   ├── styles/variables.css
│   ├── utils/{cities,format,storage,validation,weatherCodes}.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── PROMPTS.md
```

### Data flow

1. `Dashboard.jsx` owns the active city, favourites, online status, and dialog state.
2. `useCitySearch` debounces input, calls `cityService.searchCities`, and exposes results plus
   validation and loading/error state.
3. `useWeather` fetches through `weatherService.getWeather`, cancels superseded requests, and
   falls back to the app-managed saved reading when offline or when a request fails.
4. Presentational components (`CurrentWeather`, `WeatherHighlights`, `Forecast`) receive only the
   normalised data they need.
5. `useFavorites` and `useNotifications` persist through `utils/storage`, which degrades to an
   in-memory store when `localStorage` is unavailable.

### Key decisions

1. **Preserve the existing app and design.** The Phase-1 shell, layout, palette, and Inter
   typography were kept; only the data and interaction layers were replaced.
2. **Open-Meteo for weather.** It is keyless, reliable, and returns everything the dashboard needs,
   avoiding a hard dependency on a secret for the core experience.
3. **No weather API caching in the service worker.** A cached HTTP 200 is indistinguishable from a
   live reading. Saved weather is stored by the app instead and always labelled `SAVED WEATHER`.
4. **No new dependencies.** All features use packages that were already installed.
5. **JavaScript only.** No TypeScript was introduced, matching the assessment constraints.
6. **Service and hook separation.** API logic lives in `src/services`, React state orchestration in
   `src/hooks`, presentation in `src/components`.
7. **Best-effort reminders.** The app does not claim guaranteed background delivery, because
   browsers may suspend service workers and timers when the app is fully closed.
8. **Secrets stay out of source.** `.env` is ignored; the committed `.env.example` only documents
   variable names.

---

## PWA and offline behaviour

- The manifest is generated at `dist/manifest.webmanifest` with `display: standalone`,
  `theme_color: #0B1220`, and 192/512 PNG icons.
- The generated service worker precaches the app shell and imports `notification-sw.js`.
- Runtime caching is limited to geocoding and GeoDB responses; **weather API responses are not
  cached by the service worker**.
- Offline flow:
  1. The header shows `Offline`.
  2. A banner explains that the app is offline.
  3. If weather was saved for the active city, it is shown with `SAVED WEATHER`,
     `Not live · saved <time>`, and a saved-data footer.
  4. If no weather was saved for that city, an offline empty state explains this and offers retry.
  5. On `online`, the app refreshes and returns to `LIVE WEATHER`.

## Notification limitations

- Permission is requested only after the user opts in, and the app explains the behaviour first.
- Unsupported browsers show an explanatory message instead of a broken control.
- If permission is denied or blocked, the dialog explains how to re-enable it in site settings;
  the rest of the app continues to work.
- Delivery while the app is **fully closed** depends on browser background execution and is not
  guaranteed. The page timer, service-worker timer, and periodic sync are all attempted as a
  best-effort strategy.

---

## Design system

| Token | Value | Usage |
| --- | --- | --- |
| Background | `#0B1220` | App canvas |
| Sidebar | `#0E1728` | Sidebar surface |
| Card surface | `#111C2D` | Cards and inputs |
| Border | `#243449` | Card and input borders |
| Cyan accent | `#38BDF8` | Highlights, icons, focus |
| Strong accent | `#0EA5E9` | Primary buttons and selection |
| Text | `#F8FAFC` | Primary text |
| Muted text | `#94A3B8` | Secondary text |
| Dim text | `#64748B` | Labels and metadata |
| Font | Inter | Whole application |

Tokens live in `src/styles/variables.css`; component styles live in `src/App.css`.

---

## Verification results

### Build

`npm run build` succeeds. The latest production build reports:

- Vite production build completed (≈ 2.5–4 s locally).
- CSS bundle ≈ 34 kB (≈ 7 kB gzip); JS bundle ≈ 414 kB (≈ 133 kB gzip).
- PWA plugin generated `dist/sw.js` and the Workbox runtime.
- **50 precache entries** (≈ 1,000 KiB).
- Generated manifest validated as JSON with `display: standalone` and `theme_color: #0B1220`.
- The service worker contains geocoding and GeoDB runtime routes, imports `notification-sw.js`,
  and contains **no weather-API cache route**.
- No `.env` secret was found in `dist`.

### Lint

`npm run lint` passes with **no errors** and two expected warnings:

- `src/hooks/useWeather.js` — `react(set-state-in-effect)`.
- `src/hooks/useCitySearch.js` — `react(set-state-in-effect)`.

Both are deliberate: the effects synchronise asynchronous fetch state with React, and the warnings
do not affect correctness.

### Manual browser verification

- Live weather verified for Karachi, London, Paris, and Tokyo.
- Autocomplete, keyboard selection, and city switching verified.
- Favourite add/remove, five-item cap, duplicate rejection, persistence across reload, and removal
  confirmation verified.
- Notification dialog verified: explainer, denied-permission message, disabled test action,
  Escape-to-close, and persisted settings.
- Offline behaviour verified: offline banner, no-saved-weather state, saved-weather labelling,
  cached forecast rendering, and recovery to live data on `online`.
- Responsive checks at 375 / 768 / 1280 px: no horizontal overflow, five forecast cards, working
  mobile drawer and overlay, and mobile touch targets ≥ 44×44 px.
- Service worker registration, precache contents, and manifest validity verified against the
  production preview.

### Automated tests

The project has **no automated test suite**, and none is claimed. Verification was performed
manually in the browser plus the build and lint commands above.

---

## Known limitations

- GeoDB/RapidAPI autocomplete is implemented but was not exercised against a live key; only the
  Open-Meteo geocoding fallback was verified.
- Daily notification delivery while the browser or installed PWA is fully closed cannot be
  guaranteed; scheduling is best-effort.
- The `set-state-in-effect` lint warnings described above remain (intentional).
- `public/favicon.svg` is a purple default-style icon that does not match the navy/cyan theme; it
  was retained rather than replaced without approval.
- `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, and `public/icons.svg` are
  unused and were retained rather than deleted.
- No public deployment URL and no public GitHub repository exist yet.
- Optional bonus features (theme toggle, unit toggle, animated weather icons) are not implemented.

---

## Remaining submission items

- [ ] Deploy the production build and add the public URL to this README.
- [ ] Initialise Git, create a public GitHub repository, and push the source.
- [ ] Verify the GeoDB path with a real RapidAPI key, if available.
- [ ] Capture install/offline screenshots or a short demo for the submission.
- [ ] Review `PROMPTS.md` and confirm the prompt history is complete.
- [ ] Email both links to `jobs@edspire.app` with the required subject line.

---

## Credits

Built for the **Edspire Frontend (React) Developer Technical Challenge**, November 2026.
