import type { ParentComponent } from 'solid-js'
import { children } from 'solid-js'

export type ListItemId = string
export interface ListItemProps {
  id: ListItemId
  index: number
  title: string
  count?: number
  icon?: string
  hasTool?: boolean
  activeKey?: ListItemId
  itemClick?: (id: ListItemProps['id'], index: number, event: MouseEvent) => void
}

export const toolBtnIcon = 'i-carbon-overflow-menu-horizontal'

type ListItemComProps = ParentComponent<ListItemProps>

const ListItem: ListItemComProps = (props) => {
  const c = children(() => props.children || props.title)
  const handleItemClick = (e: MouseEvent) => {
    props.itemClick?.(props.id, props.index, e)
  }
  return (
    <li class='group' flex items-center text-sm lh-10 font-normal list-none px-3 rounded cursor-pointer hover:bg-blue-50 classList={{ '!bg-blue-1': props.activeKey === props.id }} onClick={handleItemClick}>
      { props.icon && <i class={props.icon} text-gray-4></i>}
      <div class="content" px-2 flex-1>
        {c()}
      </div>
      <span data-testid='ttt' classList={{ 'group-hover:hidden': props.hasTool, 'flex': props.count !== undefined }} text-gray-4 px-2 >{props.count}</span>
      <i classList={{ 'group-hover:!flex': props.hasTool, [toolBtnIcon]: true }} hidden text-gray-4 hover:text-gray-5 text-5></i>
    </li>
  )
}

export default ListItem
