import { createSignal } from 'solid-js'
import { useSearchTasks } from './searchTasks'
import { useSearchCommand } from './searchCommand'
import type { Task } from '@/store'
import type { Command } from '@/hooks/command/useCommand'

const [filterTasks, setFilterTasks] = createSignal<Array<Task | Command>>([])
const [loading, setLoading] = createSignal(false)

export const useSearch = () => {
  const { searchTasks } = useSearchTasks()
  const { searchCommands, allCommands, initCommand } = useSearchCommand()

  const resetSearch = () => {
    setLoading(false)
    setFilterTasks(allCommands())
  }

  const initSearch = () => {
    initCommand()
    setFilterTasks(allCommands())
  }

  const search = async (keyword: string) => {
    // eslint-disable-next-line no-console
    console.log(keyword)
    // eslint-disable-next-line no-console
    console.log(loading())
    if (loading())
      return
    if (!keyword) {
      resetSearch()
      return
    }

    setLoading(true)
    if (keyword.startsWith('> ')) {
      const commandStr = keyword.match(/(?<=\>\s).*$/gm)?.[0]
      if (commandStr) {
        const commandsResult = searchCommands(commandStr)
        setFilterTasks(commandsResult)
      }
      else {
        resetSearch()
      }

      setLoading(false)
    }
    else {
      if (!loading())
        return
      const data = await searchTasks(keyword)
      setFilterTasks(data)
      setLoading(false)
    }
  }

  return {
    initSearch,
    search,
    loading,
    filterTasks,
    resetSearch,
  }
}
