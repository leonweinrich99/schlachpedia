import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * BEISPIEL für einen zeitgesteuerten Job (Vercel Cron).
 *
 * Aktivierung:
 * 1. In vercel.json ergänzen:
 *      "crons": [{ "path": "/api/cron/example-job", "schedule": "0 4 * * *" }]
 * 2. `CRON_SECRET` in den Vercel-Umgebungsvariablen setzen (freies eigenes Geheimnis).
 *    Vercel ruft Crons automatisch mit `Authorization: Bearer <CRON_SECRET>` auf,
 *    der Check unten verhindert, dass Fremde den Endpunkt selbst aufrufen.
 * 3. Firebase Admin SDK Zugangsdaten (FIREBASE_ADMIN_*) ebenfalls in Vercel setzen,
 *    falls der Job auf Firestore zugreifen soll (siehe .env.example).
 *
 * Falls kein Cron-Job gebraucht wird: diesen Ordner (api/cron) einfach löschen.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // TODO: eigentliche Job-Logik hier (z.B. Firestore lesen/schreiben,
  // externe API abfragen, Push-Benachrichtigung auslösen ...)

  return res.status(200).json({ ok: true })
}
