import { type ParentComponent, createUniqueId } from 'solid-js'
import { useListContext } from './ListContext'

export interface ListItemProps {
  id?: string
  isActived?: boolean
  icon?: string
  showOption?: boolean
  count?: number
  showZero?: boolean
  onClick?: (id?: string) => void
}

export const OPTION_ICON_NAME = 'i-carbon-overflow-menu-horizontal'

export const ListItem: ParentComponent<ListItemProps> = (props) => {
  const context = useListContext()

  const defaultProps = mergeProps({ id: createUniqueId() }, props)
  if (defaultProps.id === context.activedKey?.())
    context.setActivedItem(defaultProps)

  const isActived = createMemo(() => {
    if (context.activedKey === undefined)
      return context.activedItem()?.id === defaultProps.id
    return context.activedKey() === defaultProps.id
  })

  const handleClick = () => {
    if (isActived() && context.allowCancel) {
      context.setActivedItem(undefined)
      context.onSelect?.('')
    }
    else {
      context.setActivedItem(defaultProps)
      context.onSelect?.(defaultProps.id)
    }
    props.onClick?.(props.id)
  }

  const normalizeCount = (count: number | undefined) => {
    if (count || defaultProps.showZero)
      return count
    return ''
  }

  return (
    <li class='group' flex items-center text-sm lh-10 font-normal list-none px-3 rounded cursor-pointer hover:bg-blue-50 classList={{ '!bg-blue-1': isActived() }} onClick={handleClick}>
      { defaultProps.icon && <i class={defaultProps.icon} text-gray-4></i>}
      <div class="content" px-2 flex-1>
        {defaultProps.children}
      </div>
      <span data-testid='ttt' classList={{ 'group-hover:hidden': defaultProps.showOption, 'flex': defaultProps.count !== undefined }} text-gray-4 px-2 >{normalizeCount(defaultProps.count)}</span>
      <i classList={{ 'group-hover:!flex': defaultProps.showOption, [OPTION_ICON_NAME]: true }} hidden text-gray-4 hover:text-gray-5 text-5></i>
    </li>
  )
}
