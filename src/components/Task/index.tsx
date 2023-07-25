import type { Component } from 'solid-js'
import ToggleButton from '../ToggleButton'
import { useMainLayoutContext } from '@/layouts/MainLayoutContext'

const fakeData: Array<{
  name: string
  id: number | string
  tasks: Array<{
    id: number | string
    title: string
    content: string
  }>
}> = [{
  name: '今天',
  id: 'today',
  tasks: [{
    id: 1,
    title: 'happy coding',
    content: 'go and code it',
  }, {
    id: 2,
    title: 'sleeping well',
    content: 'soft kitty warm kitty little ball of fur',
  }, {
    id: 3,
    title: 'making progress',
    content: 'fuck it! damn it!',
  }],
}]

export const Tasks: Component<{}> = (props) => {
  const { toggleArchivePanel, archiveShow } = useMainLayoutContext()
  return (
    <div flex-col-box px-4>
      <div flex lh-10 h-10 py-4 cursor-pointer>
        <div w-8 py-1 onClick={toggleArchivePanel} flex text-6 text-gray-5>
          <Show when={archiveShow()} fallback={<i i-carbon-side-panel-open></i>}>
            <i i-carbon-side-panel-close></i>
          </Show>
        </div>
      </div>
      <div flex-col-box>
        <For each={fakeData}>
          {(item, index) => (
            <ToggleButton id={item.id} title={item.name} index={index}>
              <For each={item.tasks}>
                {task => (
                  <div>{task.title}</div>
                )}
              </For>
            </ToggleButton>
          )}
        </For>
      </div>
    </div>
  )
}
