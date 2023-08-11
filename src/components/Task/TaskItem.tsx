import { Checkbox } from '@kobalte/core'
import type { Component } from 'solid-js'

export interface TaskItemProps {
  title: string
  onChange: (status: boolean) => void
  onContextMenu?: (e: MouseEvent) => void
}

export const TaskItem: Component<TaskItemProps> = (props) => {
  return (
    <div flex-both-center w-full h-10 onContextMenu={props.onContextMenu}>
      <Checkbox.Root class="flex-both-center p-1 mx-1 h-full box-border cursor-pointer" onChange={props.onChange}>
        <Checkbox.Input />
        <Checkbox.Control class="h-3 w-3 border-gray-4 border-1 border-solid flex-both-center rd-2px shadow-gray-2 shadow-sm shadow-inner text-3 text-white data-[checked]:bg-gray-4">
          <Checkbox.Indicator>
            <i flex i-carbon-checkmark></i>
          </Checkbox.Indicator>
        </Checkbox.Control>
      </Checkbox.Root>
      <div h-full flex-1 text-gray-7 flex items-center border="0 b-1 solid gray-1">
        <div>{props.title}</div>
        <div>tag</div>
        <div>list</div>
      </div>
    </div>
  )
}
