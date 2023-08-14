import create from 'solid-zustand'
import { useTasksStore } from './tasks'
import type { BaseProject } from './listProjects'
import { ProjectType } from './listProjects'
import { collectedProject } from './smartProjects'
import { loadConcludedProjectTasks, loadListProjectTasks, loadSmartProjectTasks } from '@/api'

interface TasksSelectorStore {
  currentSelector: BaseProject | null
  setCurrentSeletor: (selector?: BaseProject | null) => void
  init: () => void
}

export const useTasksSelectorStore = create<TasksSelectorStore>((set, get) => ({
  currentSelector: collectedProject,
  setCurrentSeletor: async (selector) => {
    set(() => ({
      currentSelector: selector,
    }))

    if (selector?.type === ProjectType.SMART_PROJECT) {
      const { data } = await loadSmartProjectTasks(selector.id)
      useTasksStore.getState().updateTasks(data)
    }
    else if (selector?.type === ProjectType.LIST_PROJECT) {
      const { data } = await loadListProjectTasks()
      useTasksStore.getState().updateTasks(data)
    }
    else if (selector?.type === ProjectType.CONCLUDED_PROJECT) {
      const { data } = await loadConcludedProjectTasks()
      useTasksStore.getState().updateTasks(data)
    }
  },
  init: async () => {
    await get().setCurrentSeletor(collectedProject)
  },
}))
