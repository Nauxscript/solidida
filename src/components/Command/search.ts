import { Command } from '@/hooks/useCommand'
import { createSignal } from 'solid-js'
import type { Task } from '../../store'
import { useSearchTasks } from './searchTasks'
const [filterTasks, setFilterTasks] = createSignal<Array<Task | Command>>([])

export const useSearch = () => {
  const { searchTasks } = useSearchTasks()

  const search = async (keyword: string) => {
    if (keyword.startsWith('> ')) {
      // wip
      setFilterTasks([{
        title: '',
        id: '1',
        type: 'COMMAND',
        execute() {
          console.log('command')
        }
      }])
    }
    else {
      const data = await searchTasks(keyword)
      setFilterTasks(data)
    }
  }

  return {
    search,
    filterTasks,
  }
}
