import { createSignal } from 'solid-js'
import type { Task } from '../../store'
import { useSearchTasks } from './searchTasks'
const [filterTasks, setFilterTasks] = createSignal<Task[]>([])

export const useSearch = () => {
  const { searchTasks } = useSearchTasks()

  const search = async (keyword: string) => {
    const data = await searchTasks(keyword)
    setFilterTasks(data)
  }

  return {
    search,
    filterTasks,
  }
}
