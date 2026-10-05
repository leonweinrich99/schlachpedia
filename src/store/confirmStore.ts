import { create } from 'zustand'

interface ConfirmOptions {
  title: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  /** Rot statt Blau — für zerstörerische Aktionen (Löschen etc.) */
  danger?: boolean
}

interface PendingConfirm extends ConfirmOptions {
  resolve: (value: boolean) => void
}

interface ConfirmState {
  pending: PendingConfirm | null
  request: (options: ConfirmOptions) => Promise<boolean>
  respond: (value: boolean) => void
}

export const useConfirmStore = create<ConfirmState>()((set, get) => ({
  pending: null,
  request: (options) =>
    new Promise<boolean>((resolve) => {
      set({ pending: { ...options, resolve } })
    }),
  respond: (value) => {
    get().pending?.resolve(value)
    set({ pending: null })
  },
}))

/**
 * Imperative API — von überall aufrufbar, z.B. vor einer Lösch-Aktion:
 *
 *   import { confirm } from '../store/confirmStore'
 *
 *   const ok = await confirm({ title: 'Eintrag löschen?', danger: true })
 *   if (!ok) return
 *   ...löschen...
 *
 * Erfordert `<ConfirmDialogHost />` einmal in App.tsx gemountet.
 */
export function confirm(options: ConfirmOptions): Promise<boolean> {
  return useConfirmStore.getState().request(options)
}
