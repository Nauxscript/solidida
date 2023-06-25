import { createSignal } from 'solid-js'
import { A } from 'solid-start'
import { useNavigate } from '@solidjs/router'

interface NavRouteItem {
  name: string
  icon: string
  href?: string
  styles?: string
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
}, {
  name: 'search',
  icon: 'i-carbon-search',
  styles: '!text-4 ml-1',
}]

export default function Navbar() {
  const navigate = useNavigate()
  const [currHref, setCurrHref] = createSignal(location.pathname)
  const handleNavigate = (href: string) => {
    setCurrHref(href)
    navigate(href)
  }
  return (
    <nav h-full w-12 bg-blue-1 flex-col-box>
      <div class="user" flex-both-center bg-gray-2 w-8 h-8 mx-2 my-6 rounded text-gray-3 hover:text-gray-5 cursor-pointer>
        <div i-carbon-user-filled inline-block="" text-5 ></div>
      </div>
      <div class="tool-bar" flex-col-box flex-1 items-center justify-between>
        <ul class="routes" p-0 flex-col-box list-none>
          {
            navItems.map(item => (
              <li data-testid={item.name} classList={{ [item.icon]: true, '!text-dark': currHref() === item.href, '!text-4 ml-1': !item.href }} my-2 cursor-pointer text-5 text-gray hover:text-gray-7 onClick={() => item.href && handleNavigate(item.href)}></li>
            ))
          }
        </ul>
        <div class="links" flex-col-box>
          <A href="https://github.com/Nauxscript/solidida">
            <i i-carbon-logo-github inline-block="" text-5 text-gray hover:text-dark my-2 cursor-pointer></i>
          </A>
        </div>
      </div>
    </nav>
  )
}
