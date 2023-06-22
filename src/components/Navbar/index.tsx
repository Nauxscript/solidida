import { A } from 'solid-start'

interface NavRouteItem {
  icon: string
  to?: string
  styles?: string
}

const routes: NavRouteItem[] = [{
  icon: 'i-carbon-checkbox-checked',
  to: '/',
}, {
  icon: 'i-carbon-calendar-heat-map',
  to: '/about',
}, {
  icon: 'i-carbon-task-complete',
  to: '/habit',
}, {
  icon: 'i-carbon-search',
  styles: '!text-4 ml-1',
}]

const getIcon = (icon: string, isLink: boolean, styles?: string) => <i flex text-5 hover:text-gray-7 class={`${icon} ${styles || ''} ${!isLink ? 'text-gray' : ''}`}></i>

export default function Navbar() {
  return (
    <div h-full w-12 bg-blue-1 flex-col-box>
      <div class="user" flex-both-center bg-gray-2 w-8 h-8 mx-2 my-6 rounded text-gray-3 hover:text-gray-5 cursor-pointer>
        <div i-carbon-user-filled inline-block="" text-5 ></div>
      </div>
      <div class="tool-bar" flex-col-box flex-1 items-center justify-between>
        <ul class="routes" p-0 flex-col-box list-none>
          {
            routes.map(item => (
              <li my-2 cursor-pointer>
                <Show when={item.to !== undefined} fallback={() => getIcon(item.icon, false, item.styles)}>
                  <A href={item.to!} end={true} inactiveClass='text-gray' activeClass='text-dark'>
                    {getIcon(item.icon, true, item.styles)}
                  </A>
                </Show>
              </li>
            ))
          }
        </ul>
        <div class="links" flex-col-box>
          <A href="https://github.com/Nauxscript/solidida">
            <i i-carbon-logo-github inline-block="" text-5 text-gray hover:text-dark my-2 cursor-pointer></i>
          </A>
        </div>
      </div>
    </div>
  )
}
