import { test } from '@playwright/test'
import { expectNoHorizontalOverflow } from './helpers/overflow'

/**
 * TODO: Alle Routen der eigenen App eintragen, sobald sie existieren.
 * Für Login-pflichtige Routen entweder REQUIRE_LOGIN lokal für den Test-Build
 * deaktivieren, oder einen Login-Flow vor dem `page.goto` ergänzen.
 */
const ROUTES = ['/', '/settings']

for (const route of ROUTES) {
  test(`${route} — kein horizontaler Overflow (Dark Mode)`, async ({ page }) => {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    await expectNoHorizontalOverflow(page)
  })

  test(`${route} — kein horizontaler Overflow (Light Mode)`, async ({ page }) => {
    await page.goto(route)
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
    await page.waitForLoadState('networkidle')
    await expectNoHorizontalOverflow(page)
  })
}
