// import List from '../Listd'
import List from '../List'
import type { ListItemId } from '../ListItem'
import ToggleButton from '../ToggleButton'
import { SmartProjectKeys, concludedProjectBaseData, smartProjectBaseData, useListProjectsStore } from '@/store'

interface ArchiveProps {
}

const Archive = (props: ArchiveProps) => {
  const [activedKey, setActivedKey] = createSignal<ListItemId>(SmartProjectKeys.TODAY)

  const listProjects = useListProjectsStore(state => state.projects)

  const handleSelect = (key: number | string) => {
    // eslint-disable-next-line no-console
    console.log(key)
    setActivedKey(key)
  }

  return (
    <section w-full h-full flex-col-box>
      <section>
        <List.Root onSelect={handleSelect} activedKey={activedKey}>
          <For each={smartProjectBaseData} fallback={'loading'}>
            {item => (<List.Item icon={item.icon} showOption={item.showOption} count={item.count} id={item.id}>{item.name}</List.Item>)}
          </For>
        </List.Root>

      </section>
      <div h-1px bg-gray-1 mx-2 my-2></div>
      <div class="mainProjectView" flex-col-box w-full px-2 box-border>
        <For each={listProjects} fallback={'loading'}>
          {(item, index) => (
            <ToggleButton id={item.id} index={index} title={item.name} showOption={true}>
              <List.Root onSelect={handleSelect} activedKey={activedKey}>
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
        <List.Root onSelect={handleSelect} activedKey={activedKey}>
          <For each={concludedProjectBaseData} fallback={'loading'}>
            {item => (<List.Item icon={item.icon} id={item.id}>{item.name}</List.Item>)}
          </For>
        </List.Root>
      </section>
      <div class="concludedProjectView"></div>
    </section>
  )
}

export default Archive
