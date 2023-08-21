import Fuse from 'fuse.js'
import type { Command } from '@/hooks/command/useCommand'
import { useCommand } from '@/hooks/command/useCommand'
import { useConcludedProjectsStore, useSmartProjectsStore } from '@/store'

const fuse = new Fuse<Command>([], {
  keys: ['title'],
})

export const useSearchCommand = () => {
  const { smartProjectCommand, addProjectCommand } = useCommand()
  const smartProjects = useSmartProjectsStore(state => state.smartProjects)
  const concludedProjects = useConcludedProjectsStore(state => state.concludedProjects)
  addProjectCommand([...smartProjects, ...concludedProjects])

  const searchCommands = (keyword: string) => {
    fuse.setCollection(smartProjectCommand())
    const result = fuse.search(keyword)
    return result.map(i => i.item)
  }

  return {
    searchCommands,
    allCommands: smartProjectCommand,
  }
}
