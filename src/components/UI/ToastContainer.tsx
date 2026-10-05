import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { useToastStore, type ToastType } from '../../store/toastStore'
import clsx from 'clsx'

const ICONS: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const COLORS: Record<ToastType, string> = {
  success: 'var(--ios-green)',
  error: 'var(--ios-red)',
  info: 'var(--ios-blue)',
}

/**
 * Einmal ganz oben in App.tsx (außerhalb der Routen) mounten:
 *   <ToastContainer />
 * Danach von überall per `toast.success('...')` / `toast.error('...')` auslösbar
 * (siehe store/toastStore.ts).
 */
export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)
  const dismiss = useToastStore((s) => s.dismiss)

  if (toasts.length === 0) return null

  return (
    <div className="fixed left-0 right-0 bottom-20 md:bottom-6 z-[60] flex flex-col items-center gap-2 px-4 pointer-events-none">
      {toasts.map((t) => {
        const Icon = ICONS[t.type]
        return (
          <div
            key={t.id}
            className={clsx(
              'animate-slide-up pointer-events-auto flex items-center gap-2.5 max-w-sm w-full',
              'rounded-ios-lg px-4 py-3 shadow-ios-lg'
            )}
            style={{ background: 'var(--sheet-bg)', border: '0.5px solid var(--separator)' }}
          >
            <Icon size={18} style={{ color: COLORS[t.type] }} className="shrink-0" />
            <p className="ios-subhead flex-1 min-w-0 break-words" style={{ color: 'var(--label-primary)' }}>{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="shrink-0 opacity-50 active:opacity-80">
              <X size={16} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
