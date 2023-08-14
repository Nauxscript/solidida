// import List from '../Listd'
import List from '../List'
import ToggleButton from '../ToggleButton'
import type { BaseProject } from '@/store'
import { useConcludedProjectsStore, useListProjectsStore, useSmartProjectsStore } from '@/store'
import { useTasksSelectorStore } from '@/store/taskSelector'

interface ArchiveProps {
}

const Archive = (props: ArchiveProps) => {
  const [currentSelector, setCurrentSeletor] = useTasksSelectorStore(state => [state.currentSelector, state.setCurrentSeletor])
  const [concludedProjects] = useConcludedProjectsStore(state => [state.concludedProjects])
  const listProjects = useListProjectsStore(state => state.projects)
  const [smartProjects] = useSmartProjectsStore(state => [state.smartProjects])
  const [activedKey, setActivedKey] = createSignal(currentSelector?.id)

  const handleSelect = (key: string, projects: BaseProject[]) => {
    const project = projects.find(p => p.id === key)
    setActivedKey(project?.id)
    setCurrentSeletor(project)
  }

  return (
    <section w-full h-full flex-col-box>
      <section>
        <List.Root onSelect={key => handleSelect(key, smartProjects)} activedKey={activedKey()}>
          <For each={smartProjects} fallback={'loading'}>
            {item => (<List.Item icon={item.icon} showOption={item.showOption} count={item.count} id={item.id}>{item.name}</List.Item>)}
          </For>
        </List.Root>

      </section>
      <div h-1px bg-gray-1 mx-2 my-2></div>
      <div class="mainProjectView" flex-col-box w-full px-2 box-border>
        <For each={listProjects} fallback={'loading'}>
          {(item, index) => (
            <ToggleButton id={item.id} index={index} title={item.name} showOption={true}>
              <List.Root onSelect={key => handleSelect(key, listProjects)} activedKey={activedKey()}>
                <For each={item.children}>
                  {listItem => (<List.Item>{listItem.title}</List.Item>)}
                </For>
              </List.Root>
            </ToggleButton>
          )}
        </For>
      </div>
      <div h-1px bg-gray-1 mx-2 my-2></div>
      <section>
        <List.Root onSelect={key => handleSelect(key, concludedProjects)} activedKey={activedKey()}>
          <For each={concludedProjects} fallback={'loading'}>
            {item => (<List.Item icon={item.icon} id={item.id}>{item.name}</List.Item>)}
          </For>
        </List.Root>
      </section>
      <div class="concludedProjectView"></div>
    </section>
  )
}

export default Archive
