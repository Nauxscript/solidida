import { Dialog, Tooltip } from '@kobalte/core'
import type { ParentProps } from 'solid-js'
import { createShortcut } from '@solid-primitives/keyboard'
import { useCommandModal, useSearch } from '../Command'
import List from '../List'
import { goToGithub, useGoto } from '@/hooks/useGoto'
import type { Command } from '@/hooks/command/useCommand'
import type { Task } from '@/store'

interface NavRouteItem {
  name: string
  icon: string
  href: string
  tooltipText: string
}

export const navItems: NavRouteItem[] = [{
  name: 'home',
  icon: 'i-carbon-checkbox-checked',
  href: '/',
  tooltipText: '任务',
}, {
  name: 'calendar',
  icon: 'i-carbon-calendar-heat-map',
  href: '/calendar',
  tooltipText: '日历视图',
}, {
  name: 'habit',
  icon: 'i-carbon-task-complete',
  href: '/habit',
  tooltipText: '习惯打卡',
}]

const TooltipLiContent = (props: ParentProps<{
  tooltipText: string
  icon: string
}>) => (
  <Tooltip.Root placement='right'>
    <Tooltip.Trigger classList={{ [props.icon]: true, 'w-full h-full border-0 cursor-pointer': true }}>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content class=" bg-gray-8 text-gray-1 px-2 py-4px rounded">
        <Tooltip.Arrow />
        <p m-0 text-3 p-1>{props.tooltipText}</p>
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
)

export default function Navbar() {
  const { currHref, handleNavigate } = useGoto()
  const { openCommandModal, closeCommandModal, commandModalVisible, setCommandModalVisible, registerKeyboardShortcut, toggleCommandModal } = useCommandModal()
  const { filterTasks, search } = useSearch()

  registerKeyboardShortcut()

  // shortcut for temporary use
  createShortcut(['Control', ';'], () => {
    toggleCommandModal()
  }, {
    preventDefault: true,
  })

  // eslint-disable-next-line no-console
  console.log(filterTasks())

  const handleCommand = (command: Task | Command) => {
    if ('execute' in command) {
      command.execute()
      closeCommandModal()
    }
  }

  return (
    <>
    <nav h-full w-12 bg-blue-1 flex-col-box>
      <div class="user" flex-both-center bg-gray-2 w-8 h-8 mx-2 my-6 rounded text-gray-3 hover:text-gray-5 cursor-pointer>
        <div i-carbon-user-filled inline-block="" text-5 ></div>
      </div>
      <div class="tool-bar" flex-col-box flex-1 items-center justify-between>
        <ul class="routes" p-0 flex-col-box list-none h-full>
          <For each={navItems}>
            {item => (
              <li classList={{ '!text-dark': currHref() === item.href }} my-2 text-5 text-gray hover:text-gray-7 onClick={() => { handleNavigate(item.href) }}>
                <TooltipLiContent icon={item.icon} tooltipText={item.tooltipText} />
              </li>
            )}
          </For>
          <li my-2 ml-1 text-4 text-gray hover:text-gray-7 onClick={openCommandModal}>
            <TooltipLiContent icon='i-carbon-search' tooltipText='搜索' />
          </li>
          <li text-5 text-gray hover:text-dark my-2 mt-auto w-6 onClick={goToGithub}>
            <TooltipLiContent icon='i-carbon-logo-github' tooltipText='看看我的仓库' />
          </li>
        </ul>

      </div>
    </nav>
    <Dialog.Root open={commandModalVisible()} onOpenChange={setCommandModalVisible} modal >
      <Dialog.Portal>
        <Dialog.Overlay class="dialog__overlay" />
        <div top-0 left-0 flex-both-center fixed z-999 h-full w-full>
          <Dialog.Content class="flex-col-box h-450px w-720px dialog-shadow bg-white rounded-2  box-border">
            <div relative p-4 pb-0>
              <Dialog.Title class='m-0 mb-2 flex h-8 relative'>
                <input type="text" name="" id="" border="t-0 x-0 solid b-1px" w-full h-full pr-14 text-4 font-normal focus="focus:shadow-none outline-none border-b-blue-2" onInput={(e) => { search(e.target.value) }}/>
                {/* <i i-carbon-mac-command right-8 text-4 class='top-1.6 absolute'></i> */}
                <span right-2 text-4 text-gray-4 class='top-1.2 absolute'>⌘ + ;</span>
              </Dialog.Title>
              {/* <Dialog.CloseButton class="absolute right-6 top-4 flex hover:text-blue-6 cursor-pointer">
                <i i-carbon-close w-6 h-6></i>
              </Dialog.CloseButton> */}
            </div>
            <Dialog.Description class="m-0">
              <List.Root>
              <For each={filterTasks()} fallback={'loading'}>
                {item => (<List.Item onClick={() => handleCommand(item) }>{item.title}</List.Item>)}
              </For>
              </List.Root>
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
    </>

  )
}
