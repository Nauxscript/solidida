import { createShortcut } from '@solid-primitives/keyboard'
import { Dialog } from '@kobalte/core'
import List from '../List'
import { Loading } from '../Loading'
import { Empty } from '../Empty'
import { useCommandModal } from './commandModal'
import { useSearch } from './search'
import type { Command } from '@/hooks/command/useCommand'
import type { Task } from '@/store'
import { debounce } from '@/utils'

export const SearchModal = () => {
  const { closeCommandModal, commandModalVisible, registerKeyboardShortcut, toggleCommandModal } = useCommandModal()
  const { loading, isCommandMode, filterTasks, search } = useSearch()

  registerKeyboardShortcut()

  // shortcut for temporary use
  createShortcut(['Control', ';'], () => {
    toggleCommandModal()
  }, {
    preventDefault: true,
  })

  const handleCommand = (command: Task | Command) => {
    if ('execute' in command) {
      command.execute()
      closeCommandModal()
    }
  }

  const handleChange = debounce((e: Event) => {
    const target = e.target as HTMLInputElement
    search(target.value)
  })
  return (
    <Dialog.Root open={commandModalVisible()} onOpenChange={toggleCommandModal} modal >
      <Dialog.Portal>
        <Dialog.Overlay class="dialog__overlay" />
        <div top-0 left-0 flex-both-center fixed z-999 h-full w-full>
          <Dialog.Content class="flex-col-box h-450px w-720px dialog-shadow bg-white rounded-2  box-border">
            <div relative p-4 pb-0>
              <Dialog.Title class='m-0 mb-2 flex h-8 relative'>
                <div class='top-.5 absolute' classList={{ flex: isCommandMode() }} bg-white >
                  <i i-carbon-chevron-right left-0 text-6 text-blue-1 font-bold ></i>
                </div>
                <input type="text" name="" id="" border="t-0 x-0 solid b-1px" w-full h-full pr-14 text-4 font-normal focus="focus:shadow-none outline-none border-b-blue-2" classList={{ 'pl-4': isCommandMode() }} onInput={handleChange} />
                {/* <i i-carbon-mac-command right-8 text-4 class='top-1.6 absolute'></i> */}
                <span right-2 text-4 text-gray-4 class='top-1.2 absolute'>⌘ + ;</span>
              </Dialog.Title>
              {/* <Dialog.CloseButton class="absolute right-6 top-4 flex hover:text-blue-6 cursor-pointer">
                <i i-carbon-close w-6 h-6></i>
              </Dialog.CloseButton> */}
            </div>
            <Dialog.Description class="m-0 w-full h-full">
              <List.Root class='w-full h-full'>
                <Show when={!loading()} fallback={<Loading></Loading>}>
                  <For each={filterTasks()} fallback={<Empty />}>
                    {item => (<List.Item onClick={() => handleCommand(item)}>{item.title}</List.Item>)}
                  </For>
                </Show>
              </List.Root>
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
