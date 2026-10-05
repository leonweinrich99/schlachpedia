import { describe, it, expect, vi, beforeEach } from 'vitest'
import { haptic } from '../haptics'

describe('haptic', () => {
  beforeEach(() => {
    // @ts-expect-error -- vibrate ist im jsdom-Testing-Environment normalerweise nicht vorhanden
    delete navigator.vibrate
  })

  it('wirft keinen Fehler, wenn die Vibration API nicht unterstützt wird', () => {
    expect(() => haptic()).not.toThrow()
  })

  it('ruft navigator.vibrate mit dem übergebenen Pattern auf, wenn verfügbar', () => {
    const vibrate = vi.fn()
    Object.defineProperty(navigator, 'vibrate', { value: vibrate, configurable: true })

    haptic(20)

    expect(vibrate).toHaveBeenCalledWith(20)
  })

  it('nutzt 10ms als Default-Pattern', () => {
    const vibrate = vi.fn()
    Object.defineProperty(navigator, 'vibrate', { value: vibrate, configurable: true })

    haptic()

    expect(vibrate).toHaveBeenCalledWith(10)
  })
})
