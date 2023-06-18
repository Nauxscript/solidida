import { A } from 'solid-start'

export default function Navbar() {
  return (
    <div h-full w-12 bg-blue-1 flex flex-col>
      <div class="user" flex items-center justify-center bg-gray-2 w-8 h-8 mx-2 my-6 rounded text-gray-3 hover:text-gray-5 cursor-pointer>
        <div i-carbon-user-filled inline-block="" text-5 ></div>
      </div>
      <div class="tool-bar" flex flex-col flex-1 items-center justify-between>
        <ul class="routes" p-0 flex flex-col>
          <li i-carbon-checkbox-checked inline-block="" text-5 text-gray hover:text-dark my-2 cursor-pointer></li>
          <li i-carbon-calendar-heat-map inline-block="" text-5 text-gray hover:text-dark my-2 cursor-pointer></li>
          <li i-carbon-task-complete inline-block="" text-5 text-gray hover:text-dark my-2 cursor-pointer></li>
          <li i-carbon-search inline-block="" text-4 text-gray hover:text-dark my-2 ml-1 cursor-pointer></li>
        </ul>
        <div class="links" flex flex-col>
          <A href="https://github.com/Nauxscript/solidida">
            <i i-carbon-logo-github inline-block="" text-5 text-gray hover:text-dark my-2 cursor-pointer></i>
          </A>
        </div>
      </div>
    </div>
  )
}
