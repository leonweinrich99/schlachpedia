/**
 * Zentrale Env-Var-Prüfung. Warnt frühzeitig in der Konsole (statt eines stillen
 * Fehlers erst beim ersten Login-Versuch), wenn eine Konfiguration unvollständig ist
 * — z.B. wenn nur ein Teil der VITE_FIREBASE_*-Werte gesetzt wurde (typischer
 * Copy-Paste-Fehler beim Einrichten).
 */

const REQUIRED_FIREBASE_KEYS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
] as const

export function checkFirebaseEnv(): { complete: boolean; missing: string[] } {
  const env = import.meta.env as unknown as Record<string, string | undefined>
  const missing = REQUIRED_FIREBASE_KEYS.filter((key) => !env[key])

  if (import.meta.env.DEV && missing.length > 0 && missing.length < REQUIRED_FIREBASE_KEYS.length) {
    // Teilweise gesetzt = wahrscheinlich ein Tippfehler, nicht bewusst "offline"
    console.warn(
      `[env] Firebase-Konfiguration ist unvollständig. Es fehlen: ${missing.join(', ')}.\n` +
        'Entweder ALLE VITE_FIREBASE_*-Werte in .env.local eintragen, oder ALLE weglassen ' +
        '(App läuft dann bewusst im Offline-Modus, siehe src/lib/firebase.ts).'
    )
  }

  return { complete: missing.length === 0, missing }
}

/**
 * Generischer Helfer für serverseitigen Code (z.B. api/-Functions), der zwingend
 * bestimmte Env-Vars braucht (Secrets, Admin-SDK-Keys). Wirft eine klare Fehlermeldung
 * statt eines kryptischen "undefined"-Fehlers tief in einer Library.
 *
 *   const { FIREBASE_ADMIN_PROJECT_ID } = requireEnv(['FIREBASE_ADMIN_PROJECT_ID'])
 */
export function requireEnv<K extends string>(keys: K[]): Record<K, string> {
  const result = {} as Record<K, string>
  const missing: string[] = []
  for (const key of keys) {
    const value = process.env[key]
    if (!value) missing.push(key)
    else result[key] = value
  }
  if (missing.length > 0) {
    throw new Error(`Fehlende Umgebungsvariable(n): ${missing.join(', ')}`)
  }
  return result
}
