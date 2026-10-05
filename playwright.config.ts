import { defineConfig } from '@playwright/test'

/**
 * E2E-Tests laufen bewusst nur gegen Chromium (mehrere Viewport-Größen statt
 * mehrerer echter Browser) — das reicht, um überlaufende/abgeschnittene
 * Elemente auf schmalen Phone-Screens zuverlässig zu erkennen, und hält den
 * CI-Aufwand klein (nur EIN Browser-Download nötig: `npx playwright install
 * --with-deps chromium`).
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    browserName: 'chromium',
  },
  // Baut die App und startet sie im Produktions-Modus (repräsentativer als
  // der Dev-Server, u.a. für echtes CSS-Bundling/Minifizierung).
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'mobile-320 (kleinstes gängiges Gerät)', use: { viewport: { width: 320, height: 700 } } },
    { name: 'mobile-375 (iPhone SE/12 mini)', use: { viewport: { width: 375, height: 667 } } },
    { name: 'mobile-390 (iPhone 14/15)', use: { viewport: { width: 390, height: 844 } } },
    { name: 'mobile-360 (Android Standard)', use: { viewport: { width: 360, height: 800 } } },
  ],
})
