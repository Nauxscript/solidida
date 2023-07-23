import type { Accessor, ParentComponent } from 'solid-js'

export interface ToggleButtonProps {
  id: string | number
  index: number | Accessor<number>
  title: string
  expanded?: boolean
  hasTool?: boolean
  itemClick?: (id: ToggleButtonProps['id'], index: number, event: MouseEvent) => void
}

type ToggleButtonComProps = ParentComponent<ToggleButtonProps>

const ToggleButton: ToggleButtonComProps = (props) => {
  const [expanded, setExpanded] = createSignal<boolean>(!!props.expanded)
  const handleSuffixClick = (e: MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <>
      <div class='group' flex items-center text-sm lh-8 font-normal list-none pl-0 pr-3 rounded cursor-pointer hover:bg-blue-50 text-gray-7 onClick={() => setExpanded(!expanded())}>
        <i class={ expanded() ? 'i-carbon-chevron-down' : 'i-carbon-chevron-right'} invisible group-hover:visible text-gray-4></i>
        <div class="content" flex-1>
          {props.title}
        </div>
        <div flex rounded hover:bg-blue-1 invisible group-hover:visible onClick={handleSuffixClick} >
          <i i-carbon-add text-gray-4 text-5></i>
        </div>
      </div>
      <div classList={{ hidden: !expanded() }}>
        {props.children}
      </div>
    </>
  )
}

export default ToggleButton
