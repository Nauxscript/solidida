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

  const handleItemClick = (id: ListItemId) => {
    setActivedKey(id)
  }

  return (
    <section w-full h-full flex-col-box>
      <section>
        <List data={smartProjects()} activeKey={activedKey()} itemClick={handleItemClick}></List>
      </section>
      <div h-1px bg-gray-1 mx-2 my-2></div>
      <div class="mainProjectView" flex-col-box w-full px-2 box-border>
        {
          mainProjects().map(item => (
            <>
              <ToggleButton {...item}>
                <List data={item.children} activeKey={activedKey()} itemClick={handleItemClick}></List>
              </ToggleButton>
            </>
          ))
        }
      </div>
      <div h-1px bg-gray-1 mx-2 my-2></div>
      <section>
        <List data={concludedProjects()} activeKey={activedKey()} itemClick={handleItemClick}></List>
      </section>
      <div class="concludedProjectView"></div>
    </section>
  )
}

export default Archive
