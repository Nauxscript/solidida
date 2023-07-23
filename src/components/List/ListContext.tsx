import type { Accessor } from 'solid-js'
import type { ListItemProps } from './ListItem'
import type { ListRootProps } from './ListRoot'

export interface ListContextValue {
  activedItem: Accessor<any>
  setActivedItem: (item: ListItemProps | undefined) => void
  onSelect?: ListRootProps['onSelect']
}

export const ListContext = createContext<ListContextValue>()

export function useListContext() {
  const context = useContext(ListContext)

  if (context === undefined)
    throw new Error('[Damn]: `useListContext` must be used within a `ListContext` component')

  return context
}
