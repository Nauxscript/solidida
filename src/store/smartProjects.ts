import create from 'solid-zustand'
import type { BaseProject } from './listProjects'
import { ProjectType } from './listProjects'

export enum SmartProjectKeys {
  TODAY = 'TODAY',
  TOMORROW = 'TOMORROW',
  SEVENDAYS = 'SEVENDAYS',
  ASSIGNED = 'ASSIGNED',
  COLLECTED = 'COLLECTED',
}

export interface SmartProject extends BaseProject {
  id: string
  name: string
  showOption: boolean
  type: ProjectType.SMART_PROJECT
  count: number
  icon: string
}

export interface SmartProjectStore {
  smartProjects: SmartProject[]
}

interface Actions {

}

export const iconMap: Record<SmartProjectKeys, string> = {
  TODAY: 'i-carbon-calendar',
  TOMORROW: 'i-carbon-sunrise',
  SEVENDAYS: 'i-carbon-recently-viewed',
  ASSIGNED: 'i-carbon-user-role',
  COLLECTED: 'i-carbon-archive',
}

export const SmartProjectNameMap: Record<SmartProjectKeys, string> = {
  TODAY: '今天',
  TOMORROW: '明天',
  SEVENDAYS: '最近7天',
  ASSIGNED: '指派给我',
  COLLECTED: '收集箱',
}

const createSmartProjectBaseData = (id: SmartProjectKeys): SmartProject => ({
  name: SmartProjectNameMap[id],
  id,
  showOption: true,
  type: ProjectType.SMART_PROJECT,
  count: 0,
  icon: iconMap[id],
})

export const todayProject = createSmartProjectBaseData(SmartProjectKeys.TODAY)
export const tomorrowProject = createSmartProjectBaseData(SmartProjectKeys.TOMORROW)
export const sevenDaysProject = createSmartProjectBaseData(SmartProjectKeys.SEVENDAYS)
export const assignedProject = createSmartProjectBaseData(SmartProjectKeys.ASSIGNED)
export const collectedProject = createSmartProjectBaseData(SmartProjectKeys.COLLECTED)

export const useSmartProjectsStore = create<SmartProjectStore & Actions>(() => ({
  smartProjects: [
    todayProject,
    tomorrowProject,
    sevenDaysProject,
    assignedProject,
    collectedProject,
  ],
}))
