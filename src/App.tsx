import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { ErrorBoundary } from './components/UI/ErrorBoundary'
import { ToastContainer } from './components/UI/ToastContainer'
import { ConfirmDialogHost } from './components/UI/ConfirmDialogHost'
import { useAuthStore } from './store/authStore'
import { ArticlePage } from './pages/ArticlePage'
import { NewArticlePage } from './pages/NewArticlePage'

// TODO: Eigene Seiten importieren, z.B.:
// import { DashboardPage } from './pages/DashboardPage'
// import { SettingsPage } from './pages/SettingsPage'

/**
 * true  = Login ist Pflicht, App zeigt bis zur Anmeldung nur den LoginScreen
 * false = Login ist optional, App bleibt (offline) nutzbar, Login nur für Cloud-Sync
 */
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<Layout />}>
          <Route path="/neu" element={<NewArticlePage />} />
          <Route path="*" element={<ArticlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  const user = useAuthStore((s) => s.user)
  const init = useAuthStore((s) => s.init)

  useEffect(() => {
    const unsubscribe = init()
    return unsubscribe
  }, [init])

  return (
    <ErrorBoundary>
      {/* Global gemountet, damit toast.success(...) / confirm({...}) von überall
          im Code aufrufbar sind, ohne Provider-Wrapping an jeder Aufrufstelle. */}
      <ToastContainer />
      <ConfirmDialogHost />

      {(() => {
        // Ladebildschirm, solange der Auth-Status noch geprüft wird
        if (user === undefined) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-fade-in ios-body text-label-secondary">Lädt …</div>
            </div>
          )
        }
        return <AppRoutes />
      })()}
    </ErrorBoundary>
  )
}
