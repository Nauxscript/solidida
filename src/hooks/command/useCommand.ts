import { CommandToProject } from './CommandToProject'
import type { BaseProject } from '@/store'

export interface Command {
  title: string
  execute: () => void
}

const [smartProjectCommand, setSmartProjectCommand] = createSignal<Command[]>([])

export const useCommand = () => {
  const addCommand = (commands: Command[]) => {
    setSmartProjectCommand(prev => [...prev, ...commands])
  }

  const addProjectCommand = (projects: BaseProject[]) => {
    const projectCommands = projects.map((project) => {
      return new CommandToProject(project.name, project)
    })
    addCommand(projectCommands)
  }

  return {
    addCommand,
    addProjectCommand,
    smartProjectCommand,
  }
}
