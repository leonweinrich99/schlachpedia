import { useAuthStore } from '../../store/authStore'

/**
 * Generischer Login-Screen (Google + Apple). Wird gerendert, solange
 * `user === null` ist (siehe App.tsx). Bei Apps ohne Pflicht-Login stattdessen
 * einen "Später anmelden"-Link/Button ergänzen, der einfach weiter zum Router lässt.
 */
export function LoginScreen() {
  const { signInWithGoogle, signInWithApple, error } = useAuthStore()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-8">
      <div className="text-center">
        {/* TODO: Logo/Icon der App */}
        <h1 className="ios-large-title mb-2">Schlachpedia</h1>
        <p className="ios-body text-label-secondary">Melde dich an, um fortzufahren.</p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3">
        <button onClick={signInWithGoogle} className="btn-ios-secondary flex items-center justify-center gap-2">
          <GoogleIcon />
          Mit Google anmelden
        </button>
        <button onClick={signInWithApple} className="btn-ios-primary flex items-center justify-center gap-2">
          <AppleIcon />
          Mit Apple anmelden
        </button>
      </div>

      {error && (
        <p className="ios-footnote text-ios-red text-center max-w-xs break-words">{error}</p>
      )}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.61z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.19l-2.9-2.26c-.81.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.95 10.69A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.16.28-1.69V4.98H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.02l2.99-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.98l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 384 512" fill="#FFFFFF" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 0 184.8 0 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-57.7-90-57.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  )
}
