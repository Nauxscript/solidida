import { A } from 'solid-start'

interface NavRouteItem {
  icon: string
  to: string
  styles?: string
}

export default function Navbar() {
  const routes: NavRouteItem[] = [{
    icon: 'i-carbon-checkbox-checked',
    to: '',
  }, {
    icon: 'i-carbon-calendar-heat-map',
    to: '',
  }, {
    icon: 'i-carbon-task-complete',
    to: '',
  }, {
    icon: 'i-carbon-search',
    to: '',
    styles: '!text-4 ml-1',
  }]
  return (
    <div h-full w-12 bg-blue-1 flex-col-box>
      <div class="user" flex-both-center bg-gray-2 w-8 h-8 mx-2 my-6 rounded text-gray-3 hover:text-gray-5 cursor-pointer>
        <div i-carbon-user-filled inline-block="" text-5 ></div>
      </div>
      <div class="tool-bar" flex-col-box flex-1 items-center justify-between>
        <ul class="routes" p-0 flex-col-box>
          {
            routes.map(item => (
              <li class={`${item.icon} ${item.styles}`} text-5 text-gray hover:text-dark my-2 cursor-pointer></li>
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
