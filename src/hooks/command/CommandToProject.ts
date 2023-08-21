import type { Command } from './useCommand'
import type { BaseProject } from '@/store'
import { useTasksSelectorStore } from '@/store/taskSelector'

export class CommandToProject implements Command {
  private setCurrentSeletor: (selector: BaseProject | undefined) => void

  constructor(public title: string, public targetProject: BaseProject) {
    const [setCurrentSeletor] = useTasksSelectorStore(state => [state.setCurrentSeletor])
    this.setCurrentSeletor = setCurrentSeletor
  }

  execute() {
    this.setCurrentSeletor(this.targetProject)
  }
}
