import create from 'solid-zustand'
import type { Task } from './tasks'

export enum ProjectType {
  LIST_PROJECT = 'LIST_PROJECT',
  SMART_PROJECT = 'SMART_PROJECT',
  CONCLUDED_PROJECT = 'CONCLUDED_PROJECT',
}

export interface ListProject {
  id: string
  name: string
  type: ProjectType
  children: Task[]
}

interface TasksStore {
  projects: ListProject[]
  loadTask: () => void
}

const createMockProjects = (names: string[]) => {
  return names.map((name, index) => ({
    id: `${index}`,
    name,
    type: ProjectType.LIST_PROJECT,
    children: [],
  }))
}

export const useListProjectsStore = create<TasksStore>(set => ({
  projects: createMockProjects(['清单', '标签', '过滤器']),
  loadTask: () => {
    // eslint-disable-next-line no-console
    console.log('load task')
  },
}))
