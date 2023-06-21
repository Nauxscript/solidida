import type { ListItemProps } from '../ListItem'
import ListItem from '../ListItem'

interface ListProps {
  data: ListItemProps[]
}

const List = (props: ListProps) => {
  return (
    <ul class="" w-full m-0 px-2 pt-2 box-border text-gray-7>
      {
        props.data.map((item, index) => (
          <ListItem {...item} index={index}>{item.title}</ListItem>
        ))
      }
    </ul>
  )
}

export default List
