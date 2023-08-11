import type { Component } from 'solid-js'
import ToggleButton from '../ToggleButton'
import { TaskItem } from './TaskItem'
import { useMainLayoutContext } from '@/layouts/MainLayoutContext'
import { useTasksStore } from '@/store/tasks'

const headerOperations = [{
  name: 'sort',
  icon: 'i-carbon-arrows-vertical',
}, {
  name: 'option',
  icon: 'i-carbon-overflow-menu-horizontal',
}]

const handleHeaderOperate = (command: string) => {
  // eslint-disable-next-line no-console
  console.log(command)
}

export const Tasks: Component<{}> = (props) => {
  const { toggleArchivePanel, archiveShow } = useMainLayoutContext()
  const [inputValue, setInputValue] = createSignal('')

  const tasks = useTasksStore(state => state.tasks)

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setInputValue('')
    }
  }
  return (
    <div flex-col-box px-4>
      <div flex-both-center lh-10 h-10 pt-4 pb-2>
        <div w-8 h-full flex items-center text-5 text-gray-5 onClick={toggleArchivePanel} cursor-pointer>
          <Show when={archiveShow()} fallback={<i i-carbon-side-panel-open></i>}>
            <i i-carbon-side-panel-close></i>
          </Show>
        </div>
        <h5 flex flex-1 m-0 text-7 lh-relaxed>#this is fucking title</h5>
        <For each={headerOperations}>
          {item => (
            <div p-1 hover:bg-gray-1 cursor-pointer>
              <i flex text-4 text-gray-5 class={item.icon} onClick={() => handleHeaderOperate(item.name)}></i>
            </div>
          )}
        </For>
      </div>
      <div pb-2>
        <input type="text" value={inputValue()} px-2 border-none bg-gray-1 h-10 w-full box-border rounded text-4 focus:bg-transparent focus="focus:shadow-none outline-blue-1" onKeyUp={handleKeyUp} onChange={e => setInputValue(e.target.value)}/>
      </div>
      <div flex-col-box>
        <For each={[{
          name: '示例',
          id: 'example',
        }]}>
          {(item, index) => (
            <ToggleButton id={item.id} title={item.name} index={index} showTrigger={true} hoverEffect={false} expanded={true}>
              <For each={tasks}>
                {task => (
                  <TaskItem {...task}></TaskItem>
                )}
              </For>
            </ToggleButton>
          )}
        </For>
      </div>
    </div>
  )
}
