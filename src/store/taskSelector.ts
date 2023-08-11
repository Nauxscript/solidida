import create from 'solid-zustand'
import type { BaseProject } from './listProjects'

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
