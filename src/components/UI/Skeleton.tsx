import clsx from 'clsx'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circle' | 'block'
}

/**
 * Platzhalter beim ersten Laden (statt Spinner), reduziert wahrgenommene Ladezeit.
 *
 *   <Skeleton variant="text" className="w-1/2 h-4" />
 *   <Skeleton variant="circle" className="w-10 h-10" />
 *   <Skeleton variant="block" className="w-full h-24" />
 */
export function Skeleton({ className, variant = 'block' }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-skeleton-pulse',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'rounded',
        variant === 'block' && 'rounded-ios-lg',
        className
      )}
      style={{ background: 'var(--fill-tertiary)' }}
    />
  )
}

/** Fertige Karten-Skeleton-Gruppe für Listen-Ladezustände (z.B. 3-5x rendern). */
export function SkeletonCard() {
  return (
    <div className="ios-card p-4 flex items-center gap-3">
      <Skeleton variant="circle" className="w-10 h-10 shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton variant="text" className="h-3.5 w-2/3" />
        <Skeleton variant="text" className="h-3 w-1/3" />
      </div>
    </div>
  )
}
