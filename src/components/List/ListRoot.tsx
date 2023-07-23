import type { Accessor, ParentProps } from 'solid-js'
import type { ListItemProps } from '../ListItem'
import type { ListContextValue } from './ListContext'
import { ListContext } from './ListContext'

export interface ListRootProps {
  onSelect: (key: ListItemProps['id']) => void
  activedKey?: Accessor<number | string>
}

export function ListRoot(props: ParentProps<ListRootProps>) {
  const [activedItem, setActivedItem] = createSignal<ListItemProps | undefined>(undefined)
  const context: ListContextValue = {
    activedItem,
    setActivedItem,
    onSelect: props.onSelect,
    activedKey: props.activedKey,
  }
  return (
    <ListContext.Provider value={context}>
      <ul class="" w-full m-0 px-2 pt-2 box-border text-gray-7>
        {props.children}
      </ul>
    </ListContext.Provider>
  )
}
