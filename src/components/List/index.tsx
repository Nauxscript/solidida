import type { ListItemId, ListItemProps } from '../ListItem'
import ListItem from '../ListItem'

interface ListProps {
  data: ListItemProps[]
  activeKey?: ListItemId
  itemClick?: (id: ListItemId) => void
}

const List = (props: ListProps) => {
  const data = props.data.map((item, index) => ({
    ...item,
    index,
    itemClick: (id: ListItemId) => {
      props.itemClick?.(id)
    },
  }))
  return (
    <ul class="" w-full m-0 px-2 pt-2 box-border text-gray-7>
      {
        data.map(item => (
          <ListItem {...item} activeKey={props.activeKey}>{item.title}</ListItem>
        ))
      }
    </ul>
  )
}

export default List
