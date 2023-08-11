import type { BaseProject } from './listProjects'
import { ProjectType } from './listProjects'
import { TaskStatus } from './tasks'

export interface ConcludedProject extends BaseProject {
  id: string
  name: string
  type: ProjectType
  includeStatus: TaskStatus
  icon: string
}

export const concludedProjectBaseData: ConcludedProject[] = [
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
