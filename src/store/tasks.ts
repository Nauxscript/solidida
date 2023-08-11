import create from 'solid-zustand'
import { useTasksSelectorStore } from './taskSelector'

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
  addTask: (title: string) => Task | void
  removeTask: (targetTask: Task) => void
  updateTasks: (tasks: Task[]) => void
}

const createTask = (title: string, projectId = ''): Task => ({
  id: Date.now().toString(),
  projectId,
  position: 0,
  title,
  content: '',
  status: TaskStatus.ACTIVE,
  createDate: new Date(),
  tag: [],
})

export const useTasksStore = create<TasksStore>(set => ({
  tasks: [],
  addTask: (title) => {
    const currentSelector = useTasksSelectorStore.getState().currentSelector
    if (!currentSelector)
      return
    const task = createTask(title, currentSelector.id)
    set(state => ({
      tasks: [...state.tasks, task],
    }))
    return task
  },
  removeTask: (targetTask) => {
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== targetTask.id),
    }))
  },
  updateTasks: (tasks) => {
    set(() => ({
      tasks,
    }))
  },
}))
