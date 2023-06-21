import List from '../List'
import ToggleButton from '../ToggleButton'
import { concludedProjectBaseData, mainProjectBaseData, smartProjectBaseData } from '@/utils/constant'

interface ArchiveProps {
}

const Archive = (props: ArchiveProps) => {
  const [smartProjects, updateSmartProjects] = createSignal(smartProjectBaseData)
  const [concludedProjects, updateConcludedProjects] = createSignal(concludedProjectBaseData)
  const [mainProjects, updateMainProjects] = createSignal(mainProjectBaseData)
  return (
    <section w-full h-full flex-col-box>
      <section>
        <List data={smartProjects()}></List>
      </section>
      <div h-1px bg-gray-1 mx-2 my-2></div>
      <div class="mainProjectView" flex-col-box w-full px-2 box-border>
        {
          mainProjects().map(item => (
            <>
              <ToggleButton {...item}>
                <List data={item.children}></List>
              </ToggleButton>
            </>
          ))
        }
      </div>
      <div h-1px bg-gray-1 mx-2 my-2></div>
      <section>
        <List data={concludedProjects()}></List>
      </section>
      <div class="concludedProjectView"></div>
    </section>
  )
}

export default Archive
