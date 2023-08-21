import type { ParentProps } from 'solid-js'
import type { ListContextValue } from './ListContext'
import { ListContext } from './ListContext'
import type { ListItemProps } from './ListItem'

export interface ListRootProps {
  onSelect: (key: Exclude<ListItemProps['id'], undefined>) => void
  // activedKey?: Accessor<string | undefined>
  activedKey?: string
  allowCancel?: boolean
}

export function ListRoot(props: ParentProps<ListRootProps>) {
  const [activedItem, setActivedItem] = createSignal<ListItemProps | undefined>(undefined)
  const context: ListContextValue = {
    activedItem,
    setActivedItem,
    onSelect: props.onSelect,
    activedKey: () => props.activedKey,
    allowCancel: props.allowCancel,
  }
  return (
    <ListContext.Provider value={context}>
      <ul class="" w-full m-0 px-2 pt-2 box-border text-gray-7>
        {props.children}
      </ul>
    </ListContext.Provider>
  )
}
