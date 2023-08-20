import { createSignal } from 'solid-js'
import type { Task } from '../../store'
import { TaskStatus } from '../../store'
const [filterTasks, setFilterTasks] = createSignal<Task[]>([])

export const useSearch = () => {
  const search = (keyword: string) => {
    setFilterTasks([{
      title: keyword,
      id: 'i',
      status: TaskStatus.ACTIVE,
      content: '',
      tag: [],
      projectId: '1',
      position: 0,
      createDate: new Date(),
    }])
  }

  return {
    search,
    filterTasks,
  }
}
