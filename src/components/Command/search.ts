import { createSignal } from 'solid-js'
import { useSearchTasks } from './searchTasks'
import { useSearchCommand } from './searchCommand'
import type { Task } from '@/store'
import type { Command } from '@/hooks/command/useCommand'

const [filterTasks, setFilterTasks] = createSignal<Array<Task | Command>>([])
const [loading, setLoading] = createSignal(false)
const [isCommandMode, setIsCommandMode] = createSignal(false)

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

  const quitCommandMode = () => {
    isCommandMode() && setIsCommandMode(false)
  }

  const search = async (keyword: string) => {
    if (loading())
      return
    if (!keyword) {
      resetSearch()
      quitCommandMode()
      return
    }

    setLoading(true)
    if (keyword.startsWith('> ')) {
      setIsCommandMode(true)
      const commandStr = keyword.match(/(?<=\>\s).*$/gm)?.[0]
      if (commandStr) {
        const commandsResult = searchCommands(commandStr)
        setFilterTasks(commandsResult)
        setLoading(false)
      }
      else {
        resetSearch()
      }
    }
    else {
      quitCommandMode()
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
    quitCommandMode,
    isCommandMode,
  }
}
