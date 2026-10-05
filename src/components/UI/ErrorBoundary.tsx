import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  /** Optionaler Hook für Error-Tracking (z.B. Sentry.captureException). */
  onError?: (error: Error, info: ErrorInfo) => void
}

interface ErrorBoundaryState {
  error: Error | null
}

/**
 * Fängt Render-Fehler in der gesamten Komponenten-Unterbaum ab, statt die ganze
 * App weiß-abstürzen zu lassen. In App.tsx ganz außen einmal einwickeln:
 *
 *   <ErrorBoundary onError={(e) => Sentry.captureException(e)}>
 *     <App />
 *   </ErrorBoundary>
 *
 * Fängt NUR Render-/Lifecycle-Fehler ab, keine Fehler in Event-Handlern oder
 * async Code — die weiterhin normal try/catch + toast.error() behandeln.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary hat einen Fehler abgefangen:', error, info)
    this.props.onError?.(error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,69,58,0.15)' }}
          >
            <AlertTriangle size={26} style={{ color: 'var(--ios-red)' }} />
          </div>
          <div>
            <h1 className="ios-title-2 mb-1">Etwas ist schiefgelaufen</h1>
            <p className="ios-subhead text-label-secondary max-w-xs break-words">
              Die App ist auf einen unerwarteten Fehler gestoßen. Ein Neuladen hilft meistens.
            </p>
          </div>
          <button onClick={() => window.location.reload()} className="btn-ios-primary">
            Neu laden
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
