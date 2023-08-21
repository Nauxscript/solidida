import { createSignal } from 'solid-js'
import type { Task } from '../../store'
import { useSearchTasks } from './searchTasks'
import type { Command } from '@/hooks/useCommand'
const [filterTasks, setFilterTasks] = createSignal<Array<Task | Command>>([])

export const useSearch = () => {
  const { searchTasks } = useSearchTasks()

  const search = async (keyword: string) => {
    if (keyword.startsWith('> ')) {
      setFilterTasks([{
        title: '',
        id: '1',
        type: 'COMMAND',
        execute() {
          // eslint-disable-next-line no-console
          console.log('command')
        },
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
