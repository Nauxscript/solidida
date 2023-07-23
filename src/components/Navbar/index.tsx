import { Tooltip } from '@kobalte/core'
import type { ParentProps } from 'solid-js'
import { useCommandModal } from '../Command'
import { goToGithub, useGoto } from '@/hooks/useGoto'

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
    <Tooltip.Trigger classList={{ [props.icon]: true, 'w-full h-full': true }}>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content class=" bg-gray-8 text-gray-1 px-2 py-4px rounded">
        <Tooltip.Arrow />
        <p m-0 text-4>{props.tooltipText}</p>
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
)

export default function Navbar() {
  const { currHref, handleNavigate } = useGoto()
  const { openSearchPanel } = useCommandModal()
  return (
    <nav h-full w-12 bg-blue-1 flex-col-box>
      <div class="user" flex-both-center bg-gray-2 w-8 h-8 mx-2 my-6 rounded text-gray-3 hover:text-gray-5 cursor-pointer>
        <div i-carbon-user-filled inline-block="" text-5 ></div>
      </div>
      <div class="tool-bar" flex-col-box flex-1 items-center justify-between>
        <ul class="routes" p-0 flex-col-box list-none h-full>
          <For each={navItems}>
            {item => (
              <li classList={{ '!text-dark': currHref() === item.href }} my-2 cursor-pointer text-5 text-gray hover:text-gray-7 onClick={() => { handleNavigate(item.href) }}>
                <TooltipLiContent icon={item.icon} tooltipText={item.tooltipText} />
              </li>
            )}
          </For>
          <li my-2 ml-1 cursor-pointer text-4 text-gray hover:text-gray-7 onClick={openSearchPanel}>
            <TooltipLiContent icon='i-carbon-search' tooltipText='搜索' />
          </li>
          <li text-5 text-gray hover:text-dark my-2 cursor-pointer mt-auto w-8 onClick={goToGithub}>
            <TooltipLiContent icon='i-carbon-logo-github' tooltipText='看看我的仓库' />
          </li>
        </ul>

      </div>
    </nav>
  )
}
