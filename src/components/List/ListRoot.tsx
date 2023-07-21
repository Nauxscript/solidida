import type { ListItemProps } from '../ListItem'
import type { ListContextValue } from './ListContext'
import { ListContext } from './ListContext'

export function ListRoot() {
  const [activedItem, setActivedItem] = createSignal<ListItemProps | undefined>(undefined)

  const context: ListContextValue = {
    activedItem,
    setActivedItem,
  }
  return (
    <ListContext.Provider value={context}>
      <ul class="" w-full m-0 px-2 pt-2 box-border text-gray-7>
      </ul>
    </ListContext.Provider>
  )
}
