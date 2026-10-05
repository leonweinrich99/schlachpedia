import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    // e2e/ enthält Playwright-Tests (eigener Runner, siehe playwright.config.ts) —
    // ohne diesen Ausschluss versucht Vitest, sie ebenfalls einzusammeln und
    // scheitert daran, dass dort `test()` von @playwright/test statt vitest kommt.
    exclude: ['node_modules/**', 'e2e/**', 'dist/**'],
  },
})
