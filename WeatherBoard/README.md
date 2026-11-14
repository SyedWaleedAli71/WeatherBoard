# WeatherBoard

WeatherBoard is a responsive weather dashboard built with **React 19 + Vite** for the
**Edspire Frontend (React) Developer Technical Challenge (November 2026)**.

Search for a city, view live current conditions and a five-day forecast, save up to five
favourite cities, and opt in to a daily morning reminder. The production build is an installable
PWA that keeps working offline for the last-viewed city, while clearly labelling saved data as
not live.

> **Status:** all mandatory application features are implemented, polished, and verified locally
> in Prompt-3. The public deployment URL and public GitHub repository — both required for
> submission — do not exist yet. See [Remaining submission items](#remaining-submission-items).

---

## Live URL

**Not deployed yet.** Replace this line with the public URL after deploying to Vercel, Netlify, or
a similar static host. Do not commit a placeholder as if it were a working URL.

```text
https://<your-project>.vercel.app
```

## Repository

The working copy is **not currently a Git repository**. A public GitHub repository is required
for submission and has not been created yet. See
[Deployment and submission](#deployment-and-submission) for the exact commands.

---

## Features

### Live weather data
- Current temperature, feels-like temperature, condition, humidity, wind speed, visibility,
  sunrise, and sunset, plus the local observation time.
- Five-day forecast with weekday labels, condition icons, and daily highs and lows.
- **OpenWeatherMap is the optional primary provider** when `VITE_OPENWEATHER_API_KEY` is set.
  It uses the `/weather` and `/forecast` endpoints and groups the three-hourly forecast into five
  local calendar days.
- **Open-Meteo is the automatic fallback** when no OpenWeatherMap key is configured, or when the
  primary request fails, times out, or is rate-limited. It is free and keyless.
- The UI labels the active source honestly: `OpenWeatherMap`, `Open-Meteo`, or
  `Open-Meteo (backup)`. With no key configured, production currently uses Open-Meteo only.
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
- Quick access from the sidebar; selecting a favourite closes the mobile drawer.
- If `localStorage` is unavailable (private mode, quota, disabled), the app falls back to an
  in-memory store and tells the user that favourites will not survive a refresh.

### PWA and offline support
- Valid web app manifest: `display: standalone`, `theme_color: #0B1220`, `background_color:
  #0B1220`, `start_url` and `scope` set, and real 192 px + 512 px PNG icons (including a maskable
  entry).
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
- The dialog states the closed-tab limitation explicitly. The app does **not** claim reliable
  closed-tab delivery.

### Responsive layout and accessibility
- Verified at exactly **375 px, 768 px, and 1280 px** with no horizontal overflow, overlapping
  cards, or clipped text.
- Mobile sidebar drawer with an accessible overlay button and a 44×44 close control; the drawer
  fits the viewport and closes after choosing a city.
- Interactive controls are at least **44×44 px** on mobile.
- Combobox, dialog, forecast cards, and icon-only controls have appropriate ARIA labels, pressed
  states, and focus handling.
- Secondary text uses `#8da0b6` on dark surfaces to meet WCAG AA contrast.
- The dark navy/cyan visual identity and Inter typography are preserved throughout.
- Production Lighthouse (local origin): **Accessibility 100, Best Practices 100, SEO 100**, with
  zero failing audits and zero console errors.

---

## PDF requirements and status

| # | Requirement | Status |
| --- | --- | --- |
| 01 | City search with live autocomplete, results within 300 ms, empty/error states | **Implemented** — GeoDB primary when keyed, Open-Meteo fallback verified; 300 ms debounce verified |
| 02 | Real current conditions and five-day forecast, with loading and error states | **Implemented** — live Open-Meteo data verified; OpenWeatherMap normalisation verified with fixtures |
| 03 | Client-side validation on blur and submit, inline actionable messages | **Implemented** — empty, short, over-long, no-results, network, and API errors |
| 04 | Up to five favourites in `localStorage`, quick access, removal confirmation, graceful degradation | **Implemented** — persistence, dedupe, cap, confirmation, memory fallback |
| 05 | Installable PWA: manifest, service worker, app-shell caching, last-city offline support, offline banner | **Implemented** — verified locally; saved data always labelled as not live |
| 06 | Daily morning reminder with user-chosen time, permission explanation, fallback | **Implemented (best-effort delivery)** — closed-tab delivery cannot be guaranteed by browsers |
| 07 | Responsive at 375 / 768 / 1280 px, no horizontal scroll, 44×44 px touch targets | **Implemented** — verified with an exact-width iframe harness |
| 08 | Public deployment URL and public GitHub repository | **Missing** — required for submission; see next steps |
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

# 3. (Optional) add an OpenWeatherMap key and/or a RapidAPI key
#    Without them, the keyless Open-Meteo APIs are used.

# 4. Start the development server
npm run dev

# 5. Build and preview the production PWA
npm run build
npm run preview

# 6. Lint
npm run lint
```

The dev server runs at `http://localhost:5173` by default; `npm run preview` serves the production
build at `http://localhost:4173`.

Because the service worker is only generated for production, test offline, install, and
notification behaviour against `npm run preview` (or another static server for `dist/`), not the
dev server.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production build in `dist/` (including the service worker) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

### Environment variables

Only variables prefixed with `VITE_` are exposed to the browser. **Vite inlines every `VITE_*`
value into the client bundle, so treat them as public configuration, not private secrets.** A
key placed in a `VITE_*` variable can be read by anyone who downloads the deployed JavaScript.
For this assessment that is acceptable for restricted/free API keys, but do not reuse a valuable
secret here.

`.env` is Git-ignored; `.env.example` documents the supported names and contains no secrets.

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_OPENWEATHER_API_KEY` | No | Enables OpenWeatherMap as the primary weather provider. When empty, Open-Meteo is used directly. |
| `VITE_RAPIDAPI_KEY` | No | GeoDB Cities via RapidAPI for primary autocomplete. When empty, Open-Meteo geocoding is used. |
| `VITE_OPENWEATHER_BASE_URL` | No | Override the OpenWeatherMap base URL (default `https://api.openweathermap.org/data/2.5`). |
| `VITE_OPEN_METEO_BASE_URL` | No | Override the Open-Meteo forecast base URL (default `https://api.open-meteo.com/v1/forecast`). |
| `VITE_GEODB_BASE_URL` | No | Override the GeoDB base URL (default `https://wft-geo-db.p.rapidapi.com/v1/geo`). |

Open-Meteo weather data requires **no key**. No API secrets are committed. The current local
`.env` is gitignored and its values are not reproduced in this document.

---

## APIs

| API | Purpose | Authentication | Notes |
| --- | --- | --- | --- |
| [OpenWeatherMap](https://openweathermap.org/api) | Primary current conditions + five-day forecast | `appid` from `VITE_OPENWEATHER_API_KEY` | Optional. Normalisation and fallback verified with local fixtures; not exercised against a live key in this environment. |
| [Open-Meteo Forecast](https://open-meteo.com/) | Fallback (and default) current conditions + five-day daily forecast | None | Live-verified. Requests temperature, humidity, apparent temperature, day/night, weather code, wind, visibility, daily min/max, sunrise, sunset. |
| [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api) | City search fallback | None | Live-verified. Used when no RapidAPI key is configured. |
| [GeoDB Cities (RapidAPI)](https://rapidapi.com/wirefreethought/api/geodb-cities) | City search primary | `X-RapidAPI-Key` from `VITE_RAPIDAPI_KEY` | Code path verified; not exercised live because no key was configured. |
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
│   ├── notification-sw.js       # Reminder timer + notification display
│   └── robots.txt               # Permits crawling (valid for Lighthouse SEO)
├── scripts/
│   └── generate-pwa-icons.ps1   # Regenerates the PNG icons
├── src/
│   ├── assets/                  # Unused scaffold assets, retained
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
│   ├── utils/{cities,format,storage,validation,weatherCodes,weatherTone}.js
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
2. **OpenWeatherMap optional, Open-Meteo guaranteed.** The assessment permits either provider.
   OpenWeatherMap is used when a key exists; Open-Meteo keeps the core experience working without
   a secret and acts as the automatic fallback.
3. **No weather API caching in the service worker.** A cached HTTP 200 is indistinguishable from a
   live reading. Saved weather is stored by the app instead and always labelled `SAVED WEATHER`.
4. **Honest provider attribution.** The footer and hero show which provider supplied the active
   reading, including `(backup)` when the fallback ran.
5. **No new dependencies.** All features use packages that were already installed.
6. **JavaScript only.** No TypeScript was introduced, matching the assessment constraints.
7. **Service and hook separation.** API logic lives in `src/services`, React state orchestration in
   `src/hooks`, presentation in `src/components`.
8. **Best-effort reminders.** The app does not claim guaranteed background delivery, because
   browsers may suspend service workers and timers when the app is fully closed.
9. **Secrets stay out of source.** `.env` is ignored; the committed `.env.example` only documents
   variable names, and the README explains that `VITE_*` values are public in the bundle.

---

## PWA and offline behaviour

- The manifest is generated at `dist/manifest.webmanifest` with `display: standalone`,
  `theme_color: #0B1220`, and real 192/512 PNG icons (declared sizes match the actual images).
- The generated service worker precaches the app shell and imports `notification-sw.js`.
- Runtime caching is limited to geocoding and GeoDB responses; **weather API responses are not
  cached by the service worker**.
- Offline flow:
  1. The header shows `Offline`.
  2. A banner explains that the app is offline.
  3. If weather was saved for the active city, it is shown with `SAVED WEATHER`,
     `Not live · saved <time>`, and a saved-data footer.
  4. If no weather was saved for that city, an offline empty state explains this and offers retry
     without issuing a doomed request.
  5. On `online`, the app refreshes and returns to `LIVE WEATHER`.
- The app shell also loads from the service worker when the local origin server is stopped after a
  first visit (verified).

## Notification limitations

- Permission is requested only after the user opts in, and the app explains the behaviour first.
- Unsupported browsers show an explanatory message instead of a broken control.
- If permission is denied or blocked, the dialog explains how to re-enable it in site settings;
  the rest of the app continues to work.
- The Notification Triggers API (`showTrigger` / `TimestampTrigger`) is not available in the
  tested browser, so it is detected and not used.
- Delivery while the app is **fully closed** depends on browser background execution and is not
  guaranteed. The page timer, service-worker timer, and periodic sync are all attempted as a
  best-effort strategy. Reliable closed-tab delivery needs a Web Push sender (server or
  third-party push service), which this client-only project deliberately does not include.
- No background push success is claimed or simulated.

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
| Secondary/accessible dim | `#8DA0B6` | Labels, metadata, footer (WCAG AA) |
| Font | Inter | Whole application |

Tokens live in `src/styles/variables.css`; component styles live in `src/App.css`.
Weather-condition icon tones are centralised in `src/utils/weatherTone.js`.

---

## Verification results

### Build

`npm run build` succeeds. The final production build reports:

- Vite production build completed in ≈ 3.6 s.
- JS bundle ≈ 414.44 kB (≈ 133.02 kB gzip); CSS bundle ≈ 35.00 kB (≈ 7.18 kB gzip).
- PWA plugin generated `dist/sw.js` and the Workbox runtime.
- **50 precache entries** (≈ 1,001 KiB). The 50 entries resolve to **45 unique URLs**, because
  five assets are listed by both `includeAssets` and `globPatterns`; this is expected and not a
  failure.
- Generated manifest is valid JSON with `display: standalone` and `theme_color: #0B1220`.
- The service worker contains geocoding and GeoDB runtime routes, imports `notification-sw.js`,
  and contains **no weather-API cache route**.
- No `.env` secret was found in `dist`.

### Lint

`npm run lint` passes with **no errors** and two intentional warnings:

- `src/hooks/useWeather.js` — `react(set-state-in-effect)`.
- `src/hooks/useCitySearch.js` — `react(set-state-in-effect)`.

Both effects synchronise asynchronous fetch state with React. They are deliberate and do not
affect correctness; they are reported here rather than hidden.

### Lighthouse

Production build served from a fresh local origin:

| Category | Score |
| --- | --- |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

Zero failing audits and zero console errors. Contrast fixes (secondary text `#8da0b6`), the
forecast-card accessible-name fix, and `public/robots.txt` resolved the earlier audit findings.

### Manual browser verification

- Live weather verified for Karachi, London, Paris, and Tokyo against the production build.
- Search debounce verified: typing `L`, `Lo`, `Lon` produced exactly **one** geocoding request
  after 300 ms, with 8 suggestions and correct selection.
- Autocomplete keyboard selection and city switching verified.
- Favourite add/remove, five-item cap, duplicate rejection, persistence across reload, and removal
  confirmation verified (Paris add → toast → `4/5` → remove → `3/5`).
- Forecast card selection updates `aria-pressed` and the active state.
- Notification dialog verified: explainer, chosen time (`07:00`), test action, denied-permission
  note, closed-tab limitation text, Escape-to-close, and persisted settings.
- Offline behaviour verified with the network blocked:
  - **0 weather requests** while offline;
  - no-saved-weather state for London with a clear message;
  - `SAVED WEATHER` + `Not live · saved <time>` for Tokyo;
  - automatic recovery to `LIVE WEATHER` on `online`;
  - no console errors.
- App shell loaded with the local origin server stopped after a first visit (service-worker
  navigation fallback).
- PWA verified in the production build: service worker active and controlling, manifest
  `standalone` with `#0B1220`, real 192×192/512×512 icons, `index.html`, `manifest.webmanifest`,
  and `notification-sw.js` precached, `/robots.txt` returning 200.
- OpenWeatherMap normalisation verified with a local fixture (Karachi 24 °C, clear sky, 58 %
  humidity, 15 km/h wind, 8 km visibility, 5 days, source `OpenWeatherMap`).
- OpenWeatherMap failure verified with a fixture returning 503: the app rendered the full
  Open-Meteo fallback with source `Open-Meteo (backup)`.
- OpenWeatherMap and GeoDB live paths were **not** exercised because no real keys were configured.

### Responsive verification

An exact-width iframe harness loaded the production build at **375 / 768 / 1280 px** and reported:

| Viewport | Horizontal scroll | Forecast columns | Overlaps | Clipped text | Touch targets < 44×44 |
| --- | --- | --- | --- | --- | --- |
| 375 px | None (`scrollWidth = 375`) | 2 | None | None | None |
| 768 px | None (`scrollWidth = 768`) | 3 | None | None | None |
| 1280 px | None (`scrollWidth = 1280`) | 5 | None | None | None |

The mobile drawer fit within the viewport, its overlay is a real button labelled “Close navigation
menu”, its close control is 44×44 px, and all drawer targets met 44×44 px.

### Automated tests

The project has **no automated test suite**, and none is claimed. Verification was performed with
the browser automation harness, the build, and lint commands above. No test result was invented.

---

## Known limitations

- GeoDB/RapidAPI autocomplete is implemented but was not exercised against a live key; only the
  Open-Meteo geocoding path was verified live.
- OpenWeatherMap is implemented and fixture-verified, but the live path was not exercised without
  a real key. The current local/production configuration is Open-Meteo-only.
- Daily notification delivery while the browser or installed PWA is fully closed cannot be
  guaranteed; scheduling is best-effort. Notification Triggers are unsupported in the tested
  browser.
- The test browser's notification permission is denied, so a granted-permission delivery could not
  be observed. Unsupported and denied states were verified.
- The `localStorage`-unavailable path is code-inspected with an in-memory fallback; it was not
  destructively simulated in the browser.
- The two `set-state-in-effect` lint warnings described above remain (intentional).
- `public/favicon.svg` is a purple default-style icon that does not match the navy/cyan theme; it
  was retained rather than replaced without approval.
- `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, and `public/icons.svg` are
  unused and were retained rather than deleted.
- No public deployment URL and no public GitHub repository exist yet.
- Optional bonus features (theme toggle, unit toggle, animated weather icons) are not implemented.

---

## Deployment and submission

These commands are recommendations only. **Nothing has been deployed, pushed, or published.**

### 1. Run locally

```bash
npm install
Copy-Item .env.example .env    # PowerShell; use cp on macOS/Linux
npm run dev                    # http://localhost:5173
```

To test the production PWA (service worker, install prompt, offline):

```bash
npm run build
npm run preview                # http://localhost:4173
```

### 2. Push to GitHub

The folder is not yet a Git repository.

```bash
git init
git add .
git status                     # confirm .env and dist/ are NOT staged
git commit -m "WeatherBoard: React weather dashboard with PWA and offline support"
git branch -M main
# Create an empty public repository named weatherboard on GitHub first, then:
git remote add origin https://github.com/<your-username>/weatherboard.git
git push -u origin main
```

Before pushing, confirm `git status` does not list `.env`, `dist/`, or `node_modules/`.

### 3. Deploy with Vercel

```bash
npm install -g vercel
vercel login
vercel                         # preview deployment
vercel --prod                  # production deployment
```

Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.

Add environment variables in **Project → Settings → Environment Variables** if you want
OpenWeatherMap and/or GeoDB enabled, then redeploy:

- `VITE_OPENWEATHER_API_KEY` (optional)
- `VITE_RAPIDAPI_KEY` (optional)

Remember that these values are embedded in the public client bundle.

### 4. Deploy with Netlify

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod --dir=dist
```

Or connect the GitHub repository in the Netlify UI with:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: the same optional `VITE_*` names as above.

No SPA rewrite is strictly required because the app is a single route, but the service worker
navigation fallback handles offline deep links. If you add client-side routes later, add a
`/* /index.html 200` redirect.

### 5. Verify the live deployment

- Open the HTTPS URL in a private window.
- Confirm the live weather source label and five forecast cards.
- Run Lighthouse (Accessibility, Best Practices, SEO).
- Install the PWA, then go offline and confirm `SAVED WEATHER`.
- Confirm `/robots.txt` and `/manifest.webmanifest` return 200.
- Add the final URL to the [Live URL](#live-url) section of this README and commit it.

### 6. Submit to Edspire

Email both links to `jobs@edspire.app` with this exact subject:

```text
WeatherBoard – Frontend Challenge Submission · Deadline: Saturday, 14 Nov 2026, 11:00 AM (PKT)
```

Include:

- Public GitHub repository URL.
- Live application URL.
- A short note that notifications are best-effort while the tab is closed, as documented here.

The PDF states that submissions without both a live URL and a GitHub link will not be reviewed.

---

## Remaining submission items

- [ ] Deploy the production build and add the public URL to this README.
- [ ] Initialise Git, create a public GitHub repository, and push the source.
- [ ] Optionally verify the OpenWeatherMap and GeoDB live paths with real keys.
- [ ] Optionally capture install/offline screenshots or a short demo for the submission.
- [ ] Review `PROMPTS.md` and confirm the prompt history is complete.
- [ ] Email both links to `jobs@edspire.app` with the required subject line.

---

## Credits

Built for the **Edspire Frontend (React) Developer Technical Challenge**, November 2026.
