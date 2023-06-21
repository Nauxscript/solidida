import { type ParentComponent, children } from 'solid-js'

export interface ToggleButtonProps {
  id: string | number
  index: number
  title: string
  hasTool?: boolean
  itemClick?: (id: ToggleButtonProps['id'], index: number, event: MouseEvent) => void
}

type ToggleButtonComProps = ParentComponent<ToggleButtonProps>

const ToggleButton: ToggleButtonComProps = (props) => {
  const c = children(() => props.children)
  return (
    <button>
      {c()}
    </button>
  )
}

export default ToggleButton
