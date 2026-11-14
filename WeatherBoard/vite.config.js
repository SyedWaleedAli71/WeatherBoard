import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const GEOCODING_API = /^https:\/\/geocoding-api\.open-meteo\.com\/v1\/search/
const GEODB_API = /^https:\/\/wft-geo-db\.p\.rapidapi\.com\/v1\/geo/

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: ['favicon.svg', 'icons.svg'],
      manifest: {
        name: 'WeatherBoard — Personal Weather Dashboard',
        short_name: 'WeatherBoard',
        description:
          'Search any city, check current conditions and a five-day forecast, and save your favourite locations.',
        lang: 'en',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#0B1220',
        background_color: '#0B1220',
        categories: ['weather', 'utilities'],
        icons: [
          {
            src: '/icons/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2,webmanifest}'],
        importScripts: ['notification-sw.js'],
        cleanupOutdatedCaches: true,
        navigateFallback: '/index.html',
        // Weather responses are intentionally NOT cached by the service worker:
        // a cached 200 response would be indistinguishable from a live reading.
        // Last-viewed weather is stored by the app instead and labelled as saved.
        runtimeCaching: [
          {
            urlPattern: GEOCODING_API,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'weatherboard-geocoding-api',
              networkTimeoutSeconds: 8,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: GEODB_API,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'weatherboard-geodb-api',
              networkTimeoutSeconds: 8,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
