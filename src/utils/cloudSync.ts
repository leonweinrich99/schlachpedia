import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

/**
 * Generisches Cloud-Sync-Muster (aus FitTrack übernommen und verallgemeinert):
 *
 * Zustand-Stores, die `zustand/middleware`'s `persist()` nutzen, legen ihren State
 * ohnehin schon als JSON-Blob unter einem festen localStorage-Key ab. Statt ein
 * eigenes Cloud-Datenmodell zu entwerfen, spiegeln wir diese Blobs 1:1 nach
 * Firestore — jede künftige Änderung am Store-Schema funktioniert automatisch
 * weiter, ohne Migration.
 *
 * Nutzung (z.B. in main.tsx oder einem eigenen sync/index.ts, EINMAL beim Start):
 *
 *   import { registerSyncedStores } from './utils/cloudSync'
 *   import { useUserStore } from './store/userStore'
 *
 *   registerSyncedStores([
 *     { key: 'app-user', rehydrate: () => useUserStore.persist.rehydrate() },
 *   ])
 *
 * `key` muss exakt dem `name` entsprechen, den der jeweilige Store in seiner
 * `persist({ name: '...' })`-Config verwendet.
 *
 * Danach in authStore.ts (siehe dortiger TODO-Kommentar) bei Login/Logout:
 *   - pullFromCloud(uid) → falls kein Remote-Stand existiert: pushToCloud(uid)
 *   - bei jeder lokalen Änderung: schedulePush(uid) aufrufen (z.B. über
 *     store.subscribe(() => schedulePush(uid)) für jeden registrierten Store)
 */

interface SyncedStoreConfig {
  /** localStorage-Key, den `persist({ name })` für diesen Store verwendet. */
  key: string
  /** Lädt den (neu von Firestore geschriebenen) localStorage-Blob zurück in den Store. */
  rehydrate: () => Promise<void> | void
}

let registeredStores: SyncedStoreConfig[] = []

/** Einmal beim App-Start aufrufen, mit allen Stores, die synchronisiert werden sollen. */
export function registerSyncedStores(stores: SyncedStoreConfig[]) {
  registeredStores = stores
}

function readLocalBlob(key: string): unknown {
  const raw = localStorage.getItem(key)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeLocalBlob(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

async function rehydrateAll() {
  await Promise.all(registeredStores.map((s) => s.rehydrate()))
}

/** Lädt den aktuellen lokalen Stand aller registrierten Stores in die Cloud hoch (merge). */
export async function pushToCloud(uid: string): Promise<void> {
  if (!db) return
  const payload: Record<string, unknown> = { updatedAt: serverTimestamp() }
  for (const { key } of registeredStores) {
    const blob = readLocalBlob(key)
    if (blob !== null) payload[key] = blob
  }
  if (Object.keys(payload).length <= 1) return // nur updatedAt -> nichts zu syncen
  await setDoc(doc(db, 'users', uid), payload, { merge: true })
}

/**
 * Holt den Cloud-Stand und spielt ihn lokal ein (überschreibt lokale Daten!).
 * Gibt `true` zurück, wenn Cloud-Daten gefunden und geladen wurden — der Aufrufer
 * sollte dann bei `false` einmalig `pushToCloud(uid)` ausführen (erster Login).
 */
export async function pullFromCloud(uid: string): Promise<boolean> {
  if (!db) return false
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return false

  const data = snap.data()
  let foundAny = false
  for (const { key } of registeredStores) {
    if (data[key] !== undefined) {
      writeLocalBlob(key, data[key])
      foundAny = true
    }
  }
  if (foundAny) await rehydrateAll()
  return foundAny
}

let pushTimer: ReturnType<typeof setTimeout> | null = null
let pendingUid: string | null = null

/** Debounced Push — verhindert, dass jede einzelne Änderung sofort einen Request auslöst. */
export function schedulePush(uid: string, delay = 2500) {
  pendingUid = uid
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(() => {
    if (pendingUid) {
      pushToCloud(pendingUid).catch((err) => console.error('Cloud-Sync fehlgeschlagen:', err))
    }
  }, delay)
}

export function cancelScheduledPush() {
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = null
  pendingUid = null
}
