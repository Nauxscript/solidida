import type { ParentComponent } from 'solid-js'
import { useListProvide } from '../List'

export type ListItemId = string | number
export interface ListItemProps {
  id: ListItemId
  index: number
  title: string
  count?: number
  icon?: string
  hasTool?: boolean
  itemClick?: (id: ListItemProps['id'], index: number, event: MouseEvent) => void
}

type ListItemComProps = ParentComponent<ListItemProps>

const ListItem: ListItemComProps = (props) => {
  const c = children(() => props.children)
  const [currentItem, setCurrentItem] = useListProvide()
  const handleItemClick = (e: MouseEvent) => {
    props.itemClick?.(props.id, props.index, e)
    setCurrentItem(props.id)
  }
  return (
    <li class='group' flex items-center text-sm lh-10 font-normal list-none px-3 rounded cursor-pointer hover:bg-blue-50 classList={{ '!bg-blue-1': currentItem() === props.id }} onClick={handleItemClick}>
      { props.icon && <i class={props.icon} text-gray-4></i>}
      <div class="content" px-2 flex-1>
        {c()}
      </div>
      <span classList={{ 'group-hover:hidden': props.hasTool, 'flex': props.count !== undefined }} text-gray-4 px-2 >{props.count}</span>
      <i classList={{ 'group-hover:flex': props.hasTool }} hidden text-gray-4 hover:text-gray-5 i-carbon-overflow-menu-horizontal text-5></i>
    </li>
  )
}

export default ListItem
