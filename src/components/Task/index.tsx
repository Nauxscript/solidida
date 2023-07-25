import type { Component } from 'solid-js'
import ToggleButton from '../ToggleButton'
import type { TaskItemProps } from './TaskItem'
import { TaskItem, TaskStatus } from './TaskItem'
import { useMainLayoutContext } from '@/layouts/MainLayoutContext'

const fakeData: Array<{
  name: string
  id: number | string
  tasks: Array<TaskItemProps>
}> = [{
  name: '今天',
  id: 'today',
  tasks: [{
    id: 1,
    title: 'happy coding',
    content: 'go and code it',
    status: TaskStatus.ACTIVE,
    tag: [],
  }, {
    id: 2,
    title: 'sleeping well',
    content: 'soft kitty warm kitty little ball of fur',
    status: TaskStatus.ACTIVE,
    tag: [],
  }, {
    id: 3,
    title: 'making progress',
    content: 'fuck it! damn it!',
    status: TaskStatus.ACTIVE,
    tag: [],
  }],
}]

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
        <input type="text" px-2 border-none bg-gray-1 h-10 w-full box-border rounded focus:shadow-inset text-4 />
      </div>
      <div flex-col-box>
        <For each={fakeData}>
          {(item, index) => (
            <ToggleButton id={item.id} title={item.name} index={index} showTrigger={true} hoverEffect={false} expanded={true}>
              <For each={item.tasks}>
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
