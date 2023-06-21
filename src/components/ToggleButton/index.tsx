import { type ParentComponent, children } from 'solid-js'

export interface ToggleButtonProps {
  id: string | number
  index: number
  title: string
  expanded?: boolean
  hasTool?: boolean
  itemClick?: (id: ToggleButtonProps['id'], index: number, event: MouseEvent) => void
}

type ToggleButtonComProps = ParentComponent<ToggleButtonProps>

const ToggleButton: ToggleButtonComProps = (props) => {
  const c = children(() => props.children)
  return (
    <>
      <div class='group' flex items-center text-sm lh-8 font-normal list-none pl-0 pr-3 rounded cursor-pointer hover:bg-blue-50 text-gray-7>
        <i class={ props.expanded ? 'i-carbon-chevron-down' : 'i-carbon-chevron-right'} invisible group-hover:visible text-gray-4></i>
        <div class="content" flex-1>
          {props.title}
        </div>
      </div>
      <div>
        {c()}
      </div>
    </>
  )
}

export default ToggleButton
