/**
 * Kurzes haptisches Feedback auf unterstützten Geräten (Android Chrome; iOS Safari
 * unterstützt die Vibration API bislang nicht, ignoriert den Aufruf einfach lautlos).
 * Auf Buttons für wichtige Aktionen (Speichern, Abschließen, Löschen-Bestätigung).
 */
export function haptic(pattern: number | number[] = 10) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}
