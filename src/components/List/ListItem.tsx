import type { ParentComponent } from 'solid-js'
import { useListContext } from './ListContext'

export interface ListItemProps {
  isActived?: boolean
  icon?: string
  showOption?: boolean
  count?: number
}

export const OPTION_ICON_NAME = 'i-carbon-overflow-menu-horizontal'

export const ListItem: ParentComponent<ListItemProps> = (props) => {
  const c = children(() => props.children)
  const context = useListContext()

  const handleClick = () => {
    context.setActivedItem({
      isActived: props.isActived,
      icon: props.icon,
      showOption: props.showOption,
      count: props.count,
    })
  }
  return (
    <li class='group' flex items-center text-sm lh-10 font-normal list-none px-3 rounded cursor-pointer hover:bg-blue-50 classList={{ '!bg-blue-1': props.isActived }} onClick={handleClick}>
      { props.icon && <i class={props.icon} text-gray-4></i>}
      <div class="content" px-2 flex-1>
        {c()}
      </div>
      <span data-testid='ttt' classList={{ 'group-hover:hidden': props.showOption, 'flex': props.count !== undefined }} text-gray-4 px-2 >{props.count}</span>
      <i classList={{ 'group-hover:!flex': props.showOption, [OPTION_ICON_NAME]: true }} hidden text-gray-4 hover:text-gray-5 text-5></i>
    </li>

  )
}
