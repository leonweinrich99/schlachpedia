import { expect, type Page } from '@playwright/test'

/**
 * Prüft, ob irgendein Element über den rechten/linken Bildschirmrand hinausragt
 * — meldet im Fehlerfall die Übeltäter mit Selektor + Text.
 *
 * WICHTIG: Verlässt sich bewusst NICHT nur auf `document.documentElement.scrollWidth`
 * — die globale `overflow-x: hidden`-Sicherheitsnetz-Regel in index.css würde ein
 * zu breites Element unsichtbar "wegclippen" und dabei auch den scrollWidth-Wert
 * unauffällig halten. Stattdessen wird jedes Element einzeln gegen den Viewport
 * geprüft, damit auch geclippte/verdeckte Overflow-Bugs auffliegen, die man beim
 * flüchtigen Draufschauen sonst übersieht.
 *
 * Elemente innerhalb eines absichtlichen horizontalen Scroll-Containers
 * (`overflow-x: auto|scroll`, z.B. Karussells/Chip-Listen) werden korrekt
 * ausgeklammert — deren Kinder dürfen breiter sein als der Container.
 *
 * Verwendung:
 *   await page.goto('/')
 *   await expectNoHorizontalOverflow(page)
 *
 * Auch nach dem Öffnen von Sheets/Dialogen/langen Texten aufrufen, nicht nur
 * beim initialen Laden — viele Overflow-Bugs entstehen erst durch dynamischen
 * Inhalt (lange Namen, viele Tags, hochgeladene Bilder, ...).
 */
export async function expectNoHorizontalOverflow(page: Page) {
  const result = await page.evaluate(() => {
    const viewportWidth = window.innerWidth
    const docWidth = document.documentElement.scrollWidth
    const offenders: { selector: string; right: number; left: number; text: string }[] = []

    function isInsideScrollContainer(el: Element): boolean {
      let node = el.parentElement
      while (node && node !== document.body) {
        const overflowX = getComputedStyle(node).overflowX
        if (overflowX === 'auto' || overflowX === 'scroll') return true
        node = node.parentElement
      }
      return false
    }

    document.querySelectorAll<HTMLElement>('body *').forEach((el) => {
      // Unsichtbare/nicht gerenderte Elemente (display:none, 0×0) ignorieren
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      // Elemente in einem absichtlichen horizontalen Scroll-Container ignorieren
      if (isInsideScrollContainer(el)) return

      const tolerance = 1 // Sub-Pixel-Rundung
      if (rect.right > viewportWidth + tolerance || rect.left < -tolerance) {
        const classPart =
          typeof el.className === 'string' && el.className.trim()
            ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
            : ''
        const idPart = el.id ? `#${el.id}` : ''
        offenders.push({
          selector: el.tagName.toLowerCase() + idPart + classPart,
          right: Math.round(rect.right),
          left: Math.round(rect.left),
          text: (el.textContent || '').trim().slice(0, 40),
        })
      }
    })

    // Spezifischste (kleinste Fläche/tiefste) Elemente sind meist die eigentliche
    // Ursache statt eines großen Wrapper-Divs, das nur mitgezogen wird — nicht
    // weiter sortiert, DOM-Reihenfolge (äußere Elemente zuerst) ist meist am hilfreichsten.
    return { viewportWidth, docWidth, offenders: offenders.slice(0, 8) }
  })

  const message =
    `${result.offenders.length} Element(e) ragen über den Bildschirmrand hinaus ` +
    `(Viewport: ${result.viewportWidth}px, document.scrollWidth: ${result.docWidth}px):\n` +
    result.offenders
      .map((o) => `  - <${o.selector}> von ${o.left}px bis ${o.right}px — Text: "${o.text}"`)
      .join('\n')

  expect(result.offenders, message).toEqual([])
}
