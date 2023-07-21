import { useCommandModal } from '../Command'
import { goToGithub, useGoto } from '@/hooks/useGoto'

interface NavRouteItem {
  name: string
  icon: string
  href: string
}

export const navItems: NavRouteItem[] = [{
  name: 'home',
  icon: 'i-carbon-checkbox-checked',
  href: '/',
}, {
  name: 'calendar',
  icon: 'i-carbon-calendar-heat-map',
  href: '/calendar',
}, {
  name: 'habit',
  icon: 'i-carbon-task-complete',
  href: '/habit',
}]

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
          {
            navItems.map(item => (
              <li classList={{ [item.icon]: true, '!text-dark': currHref() === item.href }} my-2 cursor-pointer text-5 text-gray hover:text-gray-7 onClick={() => { handleNavigate(item.href) }}></li>
            ))
          }
          <li i-carbon-search my-2 ml-1 cursor-pointer text-4 text-gray hover:text-gray-7 onClick={openSearchPanel}></li>
          <li i-carbon-logo-github text-5 text-gray hover:text-dark my-2 cursor-pointer mt-auto onClick={goToGithub}></li>
        </ul>
      </div>
    </nav>
  )
}
