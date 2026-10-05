import { describe, it, expect, beforeEach } from 'vitest'
import { useThemeStore } from '../themeStore'

describe('themeStore', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('toggelt zwischen dark und light', () => {
    const initial = useThemeStore.getState().theme
    useThemeStore.getState().toggleTheme()
    const toggled = useThemeStore.getState().theme
    expect(toggled).not.toBe(initial)
  })

  it('setzt das [data-theme]-Attribut auf <html> passend zum Light-Theme', () => {
    useThemeStore.getState().setTheme('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')

    useThemeStore.getState().setTheme('dark')
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
  })

  it('persistiert die Wahl in localStorage', () => {
    useThemeStore.getState().setTheme('light')
    expect(localStorage.getItem('theme')).toBe('light')

    useThemeStore.getState().setTheme('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
