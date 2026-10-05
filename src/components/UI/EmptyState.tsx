import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}

/**
 * Für leere Listen/Bereiche ("noch keine Einträge") statt einfach nichts anzuzeigen.
 *
 *   <EmptyState icon={Inbox} title="Noch nichts hier" description="..."
 *     action={<button className="btn-ios-primary" onClick={...}>Ersten Eintrag anlegen</button>} />
 */
export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16 gap-3">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
        style={{ background: 'var(--fill-tertiary)' }}
      >
        <Icon size={26} style={{ color: 'var(--label-tertiary)' }} />
      </div>
      <h3 className="ios-headline break-words">{title}</h3>
      {description && <p className="ios-subhead text-label-secondary max-w-xs break-words">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
