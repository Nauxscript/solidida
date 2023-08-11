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
