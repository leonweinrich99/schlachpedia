import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface ActionSheetAction {
  label: string
  icon?: LucideIcon
  danger?: boolean
  onSelect: () => void
}

interface ActionSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  actions: ActionSheetAction[]
  /** Optionaler eigener Inhalt statt/zusätzlich zur Actions-Liste. */
  children?: ReactNode
}

/**
 * iOS-Style Options-Menü von unten (Unterschied zu ios-sheet: für kurze
 * Aktionslisten statt vollständiger Formulare/Inhalte).
 *
 *   const [open, setOpen] = useState(false)
 *   <ActionSheet open={open} onClose={() => setOpen(false)} title="Eintrag"
 *     actions={[
 *       { label: 'Bearbeiten', icon: Pencil, onSelect: () => ... },
 *       { label: 'Löschen', icon: Trash2, danger: true, onSelect: () => ... },
 *     ]} />
 */
export function ActionSheet({ open, onClose, title, actions, children }: ActionSheetProps) {
  if (!open) return null

  return (
    <div className="ios-sheet-overlay" onClick={onClose}>
      <div className="ios-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="ios-sheet-handle" />
        {title && (
          <div className="px-4 pb-2 pt-1 text-center">
            <p className="ios-caption uppercase tracking-wide text-label-tertiary">{title}</p>
          </div>
        )}
        <div className="overflow-y-auto pb-[env(safe-area-inset-bottom,16px)]">
          {children}
          {actions.map((action, i) => {
            const Icon = action.icon
            return (
              <button
                key={i}
                onClick={() => {
                  action.onSelect()
                  onClose()
                }}
                className="ios-row w-full ios-sep-top active:opacity-60"
              >
                {Icon && <Icon size={18} className="shrink-0" style={{ color: action.danger ? 'var(--ios-red)' : 'var(--ios-blue)' }} />}
                <span
                  className="ios-body flex-1 min-w-0 truncate text-left"
                  style={{ color: action.danger ? 'var(--ios-red)' : 'var(--label-primary)' }}
                >
                  {action.label}
                </span>
              </button>
            )
          })}
          <button onClick={onClose} className="ios-row w-full ios-sep-top justify-center font-semibold active:opacity-60">
            <span className="ios-body" style={{ color: 'var(--ios-blue)' }}>Abbrechen</span>
          </button>
        </div>
      </div>
    </div>
  )
}
