// import List from '../Listd'
import List from '../List'
import type { ListItemId } from '../ListItem'
import ToggleButton from '../ToggleButton'
import { concludedProjectBaseData, mainProjectBaseData, smartProjectBaseData } from '@/utils/constant'

interface ArchiveProps {
}

const Archive = (props: ArchiveProps) => {
  const [smartProjects, updateSmartProjects] = createSignal(smartProjectBaseData)
  const [concludedProjects, updateConcludedProjects] = createSignal(concludedProjectBaseData)
  const [mainProjects, updateMainProjects] = createSignal(mainProjectBaseData)

  const [activedKey, setActivedKey] = createSignal<ListItemId>('')

  const handleSelect = (key: number | string) => {
    // eslint-disable-next-line no-console
    console.log(key)
    setActivedKey(key)
  }

  return (
    <section w-full h-full flex-col-box>
      <section>
        <List.Root onSelect={handleSelect}>
          <For each={smartProjects()} fallback={'loading'}>
            {item => (<List.Item icon={item.icon} showOption={item.showOption} count={item.count}>{item.title}</List.Item>)}
          </For>
        </List.Root>

      </section>
      <div h-1px bg-gray-1 mx-2 my-2></div>
      <div class="mainProjectView" flex-col-box w-full px-2 box-border>
        <For each={mainProjects()} fallback={'loading'}>
          {(item, index) => (
            <ToggleButton id={item.id} index={index} title={item.title}>
              <List.Root onSelect={handleSelect}>
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
        <List.Root onSelect={handleSelect}>
          <For each={concludedProjects()} fallback={'loading'}>
            {item => (<List.Item icon={item.icon} id={item.id}>{item.title}</List.Item>)}
          </For>
        </List.Root>
        {/* <List data={concludedProjects()} activeKey={activedKey()} itemClick={handleItemClick}></List> */}
      </section>
      <div class="concludedProjectView"></div>
    </section>
  )
}

export default Archive
