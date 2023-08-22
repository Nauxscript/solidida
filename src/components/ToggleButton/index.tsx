import type { Accessor, ParentComponent } from 'solid-js'

export interface ToggleButtonProps {
  id: string | number
  index?: number | Accessor<number>
  title: string
  expanded?: boolean
  showOption?: boolean
  itemClick?: (id: ToggleButtonProps['id'], index: number, event: MouseEvent) => void
  showTrigger?: boolean
  hoverEffect?: boolean
  hideTrigger?: boolean
}

type ToggleButtonComProps = ParentComponent<ToggleButtonProps>

const ToggleButton: ToggleButtonComProps = (props) => {
  const [expanded, setExpanded] = createSignal<boolean>(!!props.expanded)
  const handleSuffixClick = (e: MouseEvent) => {
    e.stopPropagation()
  }

  const defalutProps = mergeProps({ hoverEffect: true }, props)
  return (
    <>
      <div class='group' classList={{ 'hover:bg-blue-50': defalutProps.hoverEffect, 'flex': !props.hideTrigger, 'hidden': props.hideTrigger }} items-center text-sm lh-8 font-normal list-none pl-0 pr-3 rounded cursor-pointer text-gray-7 onClick={() => setExpanded(!expanded())}>
        <i classList={{ 'invisible': !defalutProps.showTrigger, 'i-carbon-chevron-down': expanded(), 'i-carbon-chevron-right': !expanded() }} group-hover:visible text-gray-4></i>
        <div class="content" flex-1>
          {defalutProps.title}
        </div>
        <div classList={{ 'group-hover:visible': defalutProps.showOption }} flex rounded hover:bg-blue-1 invisible onClick={handleSuffixClick} >
          <i i-carbon-add text-gray-4 text-5></i>
        </div>
      </div>
      <div classList={{ hidden: !expanded() }}>
        {defalutProps.children}
      </div>
    </>
  )
}

export default ToggleButton
