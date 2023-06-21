import type { ListItemProps } from '@/components/ListItem'

enum SmartProjectKeys {
  TODAY,
  TOMORROW,
  SEVENDAYS,
  ASSIGNED,
  COLLECTED,
}

enum TaskStatus {
  COMPLETED,
  DELETED,
  ABANDONED,
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

export const mainProjectBaseData = [
  {
    id: 'detailList',
    title: '清单',
    children: [{
      id: 1,
      title: '清单 1',
      icon: 'i-carbon-menu',
      index: 0,
    },
    {
      id: 2,
      title: '清单 2',
      icon: 'i-carbon-menu',
      index: 1,
    },
    {
      id: 3,
      title: '清单 3',
      icon: 'i-carbon-menu',
      index: 2,
    }],
  },
  {
    id: 'label',
    title: '标签',
    children: [{
      id: 1,
      title: '标签 1',
      icon: 'i-carbon-tag',
      index: 0,
    }],
  },
  {
    id: 'filterer',
    title: '过滤器',
    children: [{
      id: 1,
      title: '标签 1',
      icon: 'i-carbon-tag',
      index: 0,
    }],
  },
].map((item, index) => ({ ...item, index }))

export const concludedProjectBaseData: ListItemProps[] = [
  {
    id: TaskStatus.COMPLETED,
    title: '已完成',
    icon: 'i-carbon-checkmark-outline',
  },
  {
    id: TaskStatus.ABANDONED,
    title: '已放弃',
    icon: 'i-carbon-close-outline',
  },
  {
    id: TaskStatus.DELETED,
    title: '垃圾桶',
    icon: 'i-carbon-trash-can',
  },
].map((item, index) => ({ ...item, index }))
