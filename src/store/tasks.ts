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

const fakeData = [{
  id: '1',
  projectId: '1',
  position: 1,
  title: 'happy coding',
  content: 'go and code it',
  status: TaskStatus.ACTIVE,
  createDate: new Date(),
  tag: [],
}, {
  id: '2',
  projectId: '1',
  position: 2,
  title: 'sleeping well',
  content: 'soft kitty warm kitty little ball of fur',
  status: TaskStatus.ACTIVE,
  createDate: new Date(2023, 8, 9, 10, 23, 0),
  tag: [],
}, {
  id: '3',
  projectId: '1',
  position: 3,
  title: 'making progress',
  content: 'fuck it! damn it!',
  status: TaskStatus.ACTIVE,
  createDate: new Date(2023, 8, 7, 10, 23, 0),
  tag: [],
}]

export const useTasksStore = create<TasksStore>(set => ({
  tasks: fakeData,
}))
