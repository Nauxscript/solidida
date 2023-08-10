import { ProjectType } from './listProjects'
import { TaskStatus } from './tasks'

export const concludedProjectBaseData = [
  {
    id: TaskStatus.COMPLETED,
    name: '已完成',
    type: ProjectType.CONCLUDED_PROJECT,
    includeStatus: TaskStatus.COMPLETED,
    icon: 'i-carbon-checkmark-outline',
  },
  {
    id: TaskStatus.ABANDONED,
    name: '已放弃',
    type: ProjectType.CONCLUDED_PROJECT,
    includeStatus: TaskStatus.ABANDONED,
    icon: 'i-carbon-close-outline',
  },
  {
    id: TaskStatus.REMOVED,
    name: '垃圾桶',
    type: ProjectType.CONCLUDED_PROJECT,
    includeStatus: TaskStatus.REMOVED,
    icon: 'i-carbon-trash-can',
  },
]
