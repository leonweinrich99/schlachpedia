import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './firebase'

/**
 * Verkleinert ein Bild client-seitig auf maximal `maxDimension` px (längste Kante)
 * und komprimiert es als JPEG, bevor es hochgeladen wird — spart Storage-Kosten
 * und Ladezeit, ohne dass der Nutzer selbst um Dateigröße wissen muss.
 */
async function resizeImage(file: File, maxDimension = 1600, quality = 0.85): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return file
  ctx.drawImage(bitmap, 0, 0, width, height)

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob ?? file), 'image/jpeg', quality)
  })
}

/**
 * Lädt ein Bild nach Firebase Storage hoch und gibt die öffentliche Download-URL
 * zurück. `path` z.B. `users/${uid}/profile.jpg` oder `recipes/${uid}/${crypto.randomUUID()}.jpg`.
 *
 * Denk dran, passende Storage Security Rules zu setzen (Firebase Console ->
 * Storage -> Regeln), analog zu firebase/firestore.rules — sonst kann jede*r
 * angemeldete Person überall hochladen/lesen.
 */
export async function uploadImage(path: string, file: File, opts?: { resize?: boolean }): Promise<string> {
  if (!storage) {
    throw new Error('Firebase Storage ist nicht konfiguriert (siehe .env.example).')
  }
  const blob = opts?.resize === false ? file : await resizeImage(file)
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, blob, { contentType: 'image/jpeg' })
  return getDownloadURL(storageRef)
}

/** Löscht eine zuvor hochgeladene Datei wieder (z.B. beim Ersetzen eines Profilbilds). */
export async function deleteUploadedFile(path: string): Promise<void> {
  if (!storage) return
  await deleteObject(ref(storage, path)).catch(() => {
    // Datei existiert evtl. schon nicht mehr -- kein harter Fehler nötig
  })
}
