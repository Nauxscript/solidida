import type { ParentComponent } from 'solid-js'

export interface ListItemProps {
  id: string | number
  index: number
  title: string
  count?: number
  icon?: string
  isActive?: boolean
  itemClick?: (id: ListItemProps['id'], index: string, event: MouseEvent) => void
}

type ListItemComProps = ParentComponent<ListItemProps>

const ListItem: ListItemComProps = (props) => {
  const c = children(() => props.children)
  return (
    <li text-sm lh-10 font-normal list-none px-3 rounded cursor-pointer hover:bg-blue-50 classList={{ '!bg-blue-1': props.isActive }} onClick={e => props.itemClick?.(props.id, props.index, e)}>
      <i flex class={props.icon}></i>
      <div class="content">
        {c()}
      </div>

    </li>
  )
}

export default ListItem
