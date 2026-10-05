import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'
import { checkFirebaseEnv } from './env'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

/**
 * Solange keine (oder nur unvollständige) Firebase-Umgebungsvariablen gesetzt sind
 * (siehe .env.example), bleibt die App voll im lokalen Offline-Modus nutzbar —
 * Anmeldung/Cloud-Sync werden einfach ausgeblendet, nichts crasht. Dadurch kann man
 * sofort mit `npm run dev` starten, ohne zuerst ein Firebase-Projekt anzulegen.
 * `checkFirebaseEnv()` warnt zusätzlich in der Konsole, falls nur EIN TEIL der Werte
 * gesetzt ist (typischer Copy-Paste-Fehler statt bewusstes Offline-Arbeiten).
 */
export const firebaseEnabled = checkFirebaseEnv().complete

let appInstance: FirebaseApp | null = null
let authInstance: Auth | null = null
let dbInstance: Firestore | null = null
let storageInstance: FirebaseStorage | null = null

if (firebaseEnabled) {
  appInstance = getApps().length ? getApp() : initializeApp(firebaseConfig)
  authInstance = getAuth(appInstance)
  dbInstance = getFirestore(appInstance)
  storageInstance = getStorage(appInstance)
}

export const app = appInstance
export const auth = authInstance
export const db = dbInstance
export const storage = storageInstance
