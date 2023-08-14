import create from 'solid-zustand'
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

export interface ConcludedProjectStore {
  concludedProjects: ConcludedProject[]
}

interface Actions {

}

const concludedProjectPrefix = 'PROJECT_' as const

const iconMap = {
  [`${concludedProjectPrefix}${TaskStatus.COMPLETED}`]: 'i-carbon-checkmark-outline',
  [`${concludedProjectPrefix}${TaskStatus.ABANDONED}`]: 'i-carbon-close-outline',
  [`${concludedProjectPrefix}${TaskStatus.REMOVED}`]: 'i-carbon-trash-can',
}

const createConcludedProjectBaseData = (name: string, id: string, includeStatus: TaskStatus): ConcludedProject => ({
  name,
  id,
  includeStatus,
  type: ProjectType.CONCLUDED_PROJECT,
  icon: iconMap[id] || '',
})

export const completedProject = createConcludedProjectBaseData('已完成', concludedProjectPrefix + TaskStatus.COMPLETED, TaskStatus.COMPLETED)
export const abandonedProject = createConcludedProjectBaseData('已放弃', concludedProjectPrefix + TaskStatus.ABANDONED, TaskStatus.ABANDONED)
export const removedProject = createConcludedProjectBaseData('垃圾桶', concludedProjectPrefix + TaskStatus.REMOVED, TaskStatus.REMOVED)

export const useConcludedProjectsStore = create<ConcludedProjectStore & Actions>(() => ({
  concludedProjects: [
    completedProject,
    abandonedProject,
    removedProject,
  ],
}))
