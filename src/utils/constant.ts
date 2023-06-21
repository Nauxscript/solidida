import type { ListItemProps } from '@/components/ListItem'

enum SmartProjectKeys {
  TODAY,
  TOMORROW,
  SEVENDAYS,
  ASSIGNED,
  COLLECTED,
}
export const smartProjectBaseData: ListItemProps[] = [
  {
    id: SmartProjectKeys.TODAY,
    title: '今天',
    icon: 'i-carbon-calendar',
    hasTool: true,
    count: 2,
  },
  {
    id: SmartProjectKeys.TOMORROW,
    title: '明天',
    icon: 'i-carbon-sunrise',
  },
  {
    id: SmartProjectKeys.SEVENDAYS,
    title: '最近7天',
    icon: 'i-carbon-recently-viewed',
  },
  {
    id: SmartProjectKeys.ASSIGNED,
    title: '指派给我',
    icon: 'i-carbon-user-role',
  },
  {
    id: SmartProjectKeys.COLLECTED,
    title: '收集箱',
    icon: 'i-carbon-archive',
  },
].map((item, index) => ({ ...item, index }))
