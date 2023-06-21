import List from '../List'
import { smartProjectBaseData } from '@/utils/constant'

interface ArchiveProps {
}

const Archive = (props: ArchiveProps) => {
  const [smartProjects, updateSmartProjects] = createSignal(smartProjectBaseData)
  return (
    <section w-full h-full flex-col-box>
      <section>
        <List data={smartProjects()}></List>
      </section>
      <div class="mainProjectView"></div>
      <div class="concludedProjectView"></div>
    </section>
  )
}

export default Archive
