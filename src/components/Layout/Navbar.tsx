import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Settings, Sun, Moon } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'
import clsx from 'clsx'

// TODO: Navigationspunkte an die eigene App anpassen (Icons aus lucide-react).
// 3-5 Einträge sind ideal für die mobile Tab-Bar.
const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Übersicht' },
  { to: '/settings', icon: Settings, label: 'Einstellungen' },
]

export function Navbar() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <>
      {/* ── Desktop-Sidebar ─────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col w-60 min-h-screen fixed left-0 top-0 px-3 py-8"
        style={{ background: 'var(--sidebar-bg)', borderRight: '0.5px solid var(--separator)', transition: 'background 0.25s ease' }}
      >
        <div className="flex items-center justify-between px-3 mb-8 gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* TODO: Logo/App-Name eintragen */}
            <span className="ios-title-2 truncate" style={{ color: 'var(--label-primary)' }}>App</span>
          </div>
          <button
            onClick={toggleTheme}
            className="btn-ios-icon shrink-0"
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark'
              ? <Sun size={16} style={{ color: 'var(--ios-yellow)' }} />
              : <Moon size={16} style={{ color: 'var(--ios-blue)' }} />}
          </button>
        </div>

        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-ios ios-subhead font-medium transition-colors min-w-0',
                  isActive ? 'text-ios-blue' : 'text-label-secondary hover:text-label-primary'
                )
              }
              style={({ isActive }) => (isActive ? { background: 'rgba(10,132,255,0.12)' } : {})}
            >
              <Icon size={17} className="shrink-0" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ── Mobile Bottom-Tab-Bar ────────────────────────── */}
      <nav className="ios-tab-bar">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              clsx(
                'flex-1 min-w-0 flex flex-col items-center justify-center gap-1.5 py-3 min-h-[56px] text-[11px] font-medium transition-colors',
                isActive ? 'text-ios-blue' : 'text-label-secondary'
              )
            }
          >
            <Icon size={26} />
            <span className="truncate max-w-full px-1">{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}
