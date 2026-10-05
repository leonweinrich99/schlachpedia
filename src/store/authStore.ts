import { create } from 'zustand'
import {
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth'
import { auth, firebaseEnabled } from '../lib/firebase'
import { pullFromCloud, pushToCloud, cancelScheduledPush, schedulePush } from '../utils/cloudSync'

/**
 * `undefined` = Auth-Status wird gerade geprüft (Ladebildschirm anzeigen)
 * `null`      = niemand angemeldet
 * `User`      = angemeldeter Firebase-User
 */
interface AuthState {
  user: User | null | undefined
  error: string | null
  syncing: boolean
  lastSyncedAt: string | null
  signInWithGoogle: () => Promise<void>
  /** Erfordert in der Firebase Console unter Authentication -> Sign-in-Methoden
   *  den Provider "Apple" (Service ID + Team ID von developer.apple.com). Siehe
   *  PLAYBOOK.md Schritt 5 für die genauen Einrichtungsschritte. */
  signInWithApple: () => Promise<void>
  signOutUser: () => Promise<void>
  /** Initialisiert den Auth-Listener. Einmal in App.tsx via useEffect aufrufen. Gibt Unsubscribe zurück. */
  init: () => () => void
}

let unsubscribeAutoSync: (() => void)[] = []

function stopAutoSync() {
  unsubscribeAutoSync.forEach((u) => u())
  unsubscribeAutoSync = []
  cancelScheduledPush()
}

/**
 * TODO: Hier die eigenen Zustand-Stores eintragen, die in die Cloud synchronisiert
 * werden sollen (siehe utils/cloudSync.ts für das Gesamtmuster). Beispiel:
 *
 *   import { useAppStore } from './appStore'
 *   ...
 *   unsubscribeAutoSync = [useAppStore.subscribe(trigger)]
 */
function startAutoSync(uid: string) {
  stopAutoSync()
  const trigger = () => schedulePush(uid)
  unsubscribeAutoSync = [
    // useAppStore.subscribe(trigger),
  ]
  void trigger
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: firebaseEnabled ? undefined : null,
  error: null,
  syncing: false,
  lastSyncedAt: null,

  init: () => {
    if (!firebaseEnabled || !auth) {
      set({ user: null })
      return () => {}
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      set({ user, error: null })

      if (user) {
        set({ syncing: true })
        try {
          const foundRemote = await pullFromCloud(user.uid)
          // Falls es noch keinen Cloud-Stand gibt (erster Login), lokalen Stand initial hochladen
          if (!foundRemote) await pushToCloud(user.uid)
          set({ lastSyncedAt: new Date().toISOString() })
        } catch (e) {
          console.error(e)
          set({ error: 'Cloud-Synchronisierung fehlgeschlagen. Änderungen bleiben lokal gespeichert.' })
        } finally {
          set({ syncing: false })
        }
        startAutoSync(user.uid)
      } else {
        stopAutoSync()
      }
    })

    return unsubscribe
  },

  signInWithGoogle: async () => {
    if (!firebaseEnabled || !auth) {
      set({ error: 'Anmeldung ist noch nicht konfiguriert (Firebase-Keys fehlen in .env.local).' })
      return
    }
    set({ error: null })
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Anmeldung fehlgeschlagen'
      set({ error: message })
    }
  },

  signInWithApple: async () => {
    if (!firebaseEnabled || !auth) {
      set({ error: 'Anmeldung ist noch nicht konfiguriert (Firebase-Keys fehlen in .env.local).' })
      return
    }
    set({ error: null })
    try {
      const provider = new OAuthProvider('apple.com')
      provider.addScope('email')
      provider.addScope('name')
      await signInWithPopup(auth, provider)
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Anmeldung fehlgeschlagen'
      set({ error: message })
    }
  },

  signOutUser: async () => {
    if (!auth) return
    // Vor dem Abmelden noch den letzten Stand sichern
    const uid = get().user?.uid
    if (uid) await pushToCloud(uid).catch(() => {})
    stopAutoSync()
    await signOut(auth)
  },
}))
