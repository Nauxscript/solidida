import create from 'solid-zustand'

export enum TaskStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  REMOVED = 'REMOVED',
  ABANDONED = 'ABANDONED',
}

export interface Task {
  id: string
  title: string
  status: TaskStatus
  content: string
  tag: Array<string | number>
  projectId: string
  position: number
  createDate: Date
}

interface TasksStore {
  tasks: Task[]
}

export const useTasksStore = create<TasksStore>(set => ({
  tasks: [],
}))
