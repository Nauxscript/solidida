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

const iconMap: Record<SmartProjectKeys, string> = {
  TODAY: 'i-carbon-calendar',
  TOMORROW: 'i-carbon-sunrise',
  SEVENDAYS: 'i-carbon-recently-viewed',
  ASSIGNED: 'i-carbon-user-role',
  COLLECTED: 'i-carbon-archive',
}

const createSmartProjectBaseData = (name: string, id: SmartProjectKeys): SmartProject => ({
  name,
  id,
  showOption: true,
  type: ProjectType.SMART_PROJECT,
  count: 0,
  icon: iconMap[id],
})

const todayProject = createSmartProjectBaseData('今天', SmartProjectKeys.TODAY)
const tomorrowProject = createSmartProjectBaseData('明天', SmartProjectKeys.TOMORROW)
const sevenDaysProject = createSmartProjectBaseData('最近7天', SmartProjectKeys.SEVENDAYS)
const assignedProject = createSmartProjectBaseData('指派给我', SmartProjectKeys.ASSIGNED)
const collectedProject = createSmartProjectBaseData('收集箱', SmartProjectKeys.COLLECTED)

export const smartProjectBaseData = [
  todayProject,
  tomorrowProject,
  sevenDaysProject,
  assignedProject,
  collectedProject,
]
