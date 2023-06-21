import type { Accessor, Setter } from 'solid-js'
import type { ListItemId, ListItemProps } from '../ListItem'
import ListItem from '../ListItem'

interface ListProps {
  data: ListItemProps[]
}

type DefaultListItemId = ListItemId | undefined

const [currentItem, setCurrentItem] = createSignal<DefaultListItemId>()

const ListContext = createContext<[Accessor<DefaultListItemId>, Setter<DefaultListItemId>]>([currentItem, setCurrentItem])

const List = (props: ListProps) => {
  return (
    <ListContext.Provider value={[currentItem, setCurrentItem]}>
      <ul class="" w-full m-0 px-2 pt-2 box-border text-gray-7>
        {
          props.data.map((item, index) => (
            <ListItem {...item} index={index}>{item.title}</ListItem>
          ))
        }
      </ul>
    </ListContext.Provider>
  )
}

export const useListProvide = () => useContext(ListContext)

export default List
