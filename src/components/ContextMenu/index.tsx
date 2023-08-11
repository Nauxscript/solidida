import { ContextMenu } from '@kobalte/core'
import type { ParentProps } from 'solid-js'

export enum Commands {
  REMOVE = 'REMOVE',
}

export interface ContextMenuContainerProps {
  onCommand: (command: Commands) => void
}

export const ContextMenuContainer = (props: ParentProps<ContextMenuContainerProps>) => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        {props.children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content class='border-2 dialog-shadow bg-white shadow-2xl w-180px rounded-2 py-2'>
          <ContextMenu.Item class="w-full p-2 hover:bg-blue-50 box-border cursor-pointer" onSelect={() => props.onCommand(Commands.REMOVE)}>
            删除
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
