import { Outlet } from 'react-router-dom'

/**
 * Gemeinsames App-Grundgerüst:
 * - Desktop: feste Sidebar links (siehe Navbar.tsx) + Content daneben (md:pl-60)
 * - Mobile: Content über volle Breite + fixe Bottom-Tab-Bar (Platz via pb-24 lassen)
 */
export function Layout() {
  return (
    <div className="min-h-screen">
      <main>
        <Outlet />
      </main>
    </div>
  )
}
