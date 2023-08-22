import type { Component } from 'solid-js'
import ToggleButton from '../ToggleButton'
import { Commands, ContextMenuContainer } from '../ContextMenu'
import { TaskItem } from './TaskItem'
import { useMainLayoutContext } from '@/layouts/MainLayoutContext'
import { TaskStatus, taskStatusNameMap, useTasksStore } from '@/store/tasks'
import type { Task } from '@/store'
import { useTasksSelectorStore } from '@/store/taskSelector'
import { groupByKey } from '@/utils'

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

  const taskSelectorStore = useTasksSelectorStore()
  const tasks = useTasksStore(state => state.tasks)
  const taskStore = useTasksStore()
  const [addTask, completeTask, undoCompleteTask, setActiveTask, removeTask] = useTasksStore(state => [state.addTask, state.completeTask, state.undoCompleteTask, state.setActiveTask, state.removeTask])

  const taskGroups = createMemo(() => {
    const res = groupByKey(tasks, 'status', {
      groupFn: (key, group) => {
        return {
          name: taskStatusNameMap[key as TaskStatus],
          key,
          tasks: group,
        }
      },
    }) as { name: string; key: string; tasks: Task[] }[]
    return res
  })

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask(inputValue())
      setInputValue('')
    }
  }

  const handleCheck = (checkStatus: boolean, task: Task) => {
    if (checkStatus)
      completeTask(task)
    else
      undoCompleteTask(task)
  }

  const handleContextMenu = (task: Task) => {
    setActiveTask(task)
  }

  const handleCommand = (commmand: Commands) => {
    if (commmand === Commands.REMOVE)
      taskStore.activeTask && removeTask(taskStore.activeTask)
  }

  return (
    <div flex-col-box px-4>
      <div flex-both-center lh-10 h-10 pt-4 pb-2>
        <div w-8 h-full flex items-center text-5 text-gray-5 onClick={toggleArchivePanel} cursor-pointer>
          <Show when={archiveShow()} fallback={<i i-carbon-side-panel-open></i>}>
            <i i-carbon-side-panel-close></i>
          </Show>
        </div>
        <h5 flex flex-1 m-0 text-6 lh-relaxed>{taskSelectorStore.currentSelector?.name}</h5>
        <For each={headerOperations}>
          {item => (
            <div p-1 hover:bg-gray-1 cursor-pointer>
              <i flex text-4 text-gray-5 class={item.icon} onClick={() => handleHeaderOperate(item.name)}></i>
            </div>
          )}
        </For>
      </div>
      <div pb-2>
        <input type="text" value={inputValue()} px-2 border-none bg-gray-1 h-10 w-full box-border rounded text-4 focus:bg-transparent focus="focus:shadow-none outline-blue-1" onKeyUp={handleKeyUp} onChange={e => setInputValue(e.target.value)} />
      </div>
      <div flex-col-box>
        <ContextMenuContainer onCommand={handleCommand}>
          <For each={taskGroups()}>
            {(group, index) => (
              <ToggleButton id={group.key} title={group.name} index={index} showTrigger={true} hoverEffect={false} expanded={true} hideTrigger={group.key === TaskStatus.ACTIVE}>
                <For each={group.tasks}>
                  {task => (
                    <TaskItem taskStatus={task.status} isActived={task === taskStore.activeTask} title={task.title} onChange={checkStatus => handleCheck(checkStatus, task)} onContextMenu={() => handleContextMenu(task)} onClick={() => setActiveTask(task)}></TaskItem>
                  )}
                </For>
              </ToggleButton>
            )}
          </For>
        </ContextMenuContainer>
      </div>
    </div>
  )
}
