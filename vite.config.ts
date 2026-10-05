import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// TODO: Für PWA-Support (empfohlen, damit die App "Zum Home-Bildschirm hinzufügen"
// installierbar ist) hier den Beispiel-Block aus firebase/pwa-vite-config.md
// ergänzen (vite-plugin-pwa) — siehe PLAYBOOK.md Schritt 7.
export default defineConfig({
  plugins: [react()],
})
