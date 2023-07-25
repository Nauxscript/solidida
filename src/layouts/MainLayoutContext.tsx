import type { Accessor } from 'solid-js'

export interface LayoutContextValue {
  archiveShow: Accessor<boolean>
  toggleArchivePanel: () => void
}

export const MainLayoutContext = createContext<LayoutContextValue>()

export function useMainLayoutContext() {
  const context = useContext(MainLayoutContext)

  if (context === undefined)
    throw new Error('[Damn]: `useMainLayoutContext` must be used within a `MainLayout` component')

  return context
}
