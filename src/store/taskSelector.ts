import create from 'solid-zustand'
import type { BaseProject } from './listProjects'
import { collectedProject } from './smartProjects'

interface TasksSelectorStore {
  currentSelector: BaseProject | null
  setCurrentSeletor: (selector?: BaseProject | null) => void
  init: () => void
}

export const useTasksSelectorStore = create<TasksSelectorStore>(set => ({
  currentSelector: collectedProject,
  setCurrentSeletor: (selector) => {
    set(() => ({
      currentSelector: selector,
    }))
  },
  init: () => {
    set(() => ({
      currentSelector: collectedProject,
    }))
  },
}))
