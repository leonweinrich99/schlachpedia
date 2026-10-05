import { useConfirmStore } from '../../store/confirmStore'

/**
 * Einmal ganz oben in App.tsx (außerhalb der Routen) mounten:
 *   <ConfirmDialogHost />
 * Danach von überall per `await confirm({ title: '...' })` auslösbar
 * (siehe store/confirmStore.ts).
 */
export function ConfirmDialogHost() {
  const pending = useConfirmStore((s) => s.pending)
  const respond = useConfirmStore((s) => s.respond)

  if (!pending) return null

  return (
    <div className="ios-sheet-overlay" onClick={() => respond(false)}>
      <div
        className="w-[calc(100%-2rem)] max-w-xs rounded-ios-xl overflow-hidden animate-fade-in"
        style={{ background: 'var(--sheet-bg)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pt-5 pb-4 text-center">
          <h2 className="ios-headline mb-1 break-words">{pending.title}</h2>
          {pending.message && (
            <p className="ios-footnote text-label-secondary break-words">{pending.message}</p>
          )}
        </div>
        <div className="flex ios-sep-top">
          <button
            onClick={() => respond(false)}
            className="flex-1 py-3 ios-body font-medium ios-sep-right active:opacity-60"
            style={{ color: 'var(--ios-blue)' }}
          >
            {pending.cancelLabel ?? 'Abbrechen'}
          </button>
          <button
            onClick={() => respond(true)}
            className="flex-1 py-3 ios-body font-semibold active:opacity-60"
            style={{ color: pending.danger ? 'var(--ios-red)' : 'var(--ios-blue)' }}
          >
            {pending.confirmLabel ?? 'Bestätigen'}
          </button>
        </div>
      </div>
    </div>
  )
}
