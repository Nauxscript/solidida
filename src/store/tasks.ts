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
  activeTask: Task | undefined
}

export const taskStatusNameMap: Record<TaskStatus, string> = {
  ACTIVE: '未完成',
  COMPLETED: '已完成',
  REMOVED: '已删除',
  ABANDONED: '已放弃',
}

interface Actions {
  addTask: (title: string) => Task | void
  removeTask: (targetTask: Task) => void
  updateTasks: (tasks: Task[]) => void
  updateTask: (target: Task, data: Partial<Task>) => void
  completeTask: (task: Task) => void
  abandonTask: (task: Task) => void
  undoCompleteTask: (task: Task) => void
  setActiveTask: (task: Task | undefined) => void
}

export const createTask = (title: string, projectId = ''): Task => ({
  id: Date.now().toString(),
  projectId,
  position: 0,
  title,
  content: '',
  status: TaskStatus.ACTIVE,
  createDate: new Date(),
  tag: [],
})

export const useTasksStore = create<TasksStore & Actions>((set, get) => ({
  tasks: [],
  activeTask: undefined,
  addTask: (title) => {
    if (!title)
      return
    const currentSelector = useTasksSelectorStore.getState().currentSelector
    if (!currentSelector)
      return
    const task = createTask(title, currentSelector.id)
    set(state => ({
      tasks: [...state.tasks, task],
    }))
    get().setActiveTask(task)
    return task
  },
  removeTask: (targetTask) => {
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== targetTask.id),
    }))
    if (targetTask.id === get().activeTask?.id)
      get().setActiveTask(undefined)
  },
  updateTask: (target, data) => {
    set(state => ({
      tasks: state.tasks.map((task) => {
        if (target.id === task.id) {
          return {
            ...task,
            ...data,
          }
        }
        return task
      }),
    }))
  },
  updateTasks: (tasks) => {
    set(() => ({
      tasks,
    }))
  },
  completeTask: (task) => {
    get().updateTask(task, { status: TaskStatus.COMPLETED })
  },
  abandonTask: (task) => {
    get().updateTask(task, { status: TaskStatus.ABANDONED })
  },
  undoCompleteTask: (task) => {
    get().updateTask(task, { status: TaskStatus.ACTIVE })
  },
  setActiveTask: (task) => {
    set({
      activeTask: task,
    })
  },
}))
