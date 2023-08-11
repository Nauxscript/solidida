import create from 'solid-zustand'
import type { SmartProject } from './smartProjects'
import type { ListProject } from './listProjects'
import type { ConcludedProject } from './concludedProjects'

type BaseProject = ListProject | SmartProject | ConcludedProject

interface TasksSelectorStore {
  currentSelector: BaseProject | null
  setCurrentSeletor: (selector: BaseProject | null) => void
}

export const useTasksSelectorStore = create<TasksSelectorStore>(set => ({
  currentSelector: null,
  setCurrentSeletor: (selector) => {
    set(() => ({
      currentSelector: selector,
    }))
  },
}))
