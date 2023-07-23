enum SmartProjectKeys {
  TODAY = 'TODAY',
  TOMORROW = 'TOMORROW',
  SEVENDAYS = 'SEVENDAYS',
  ASSIGNED = 'ASSIGNED',
  COLLECTED = 'COLLECTED',
}

enum TaskStatus {
  COMPLETED = 'COMPLETED',
  DELETED = 'DELETED',
  ABANDONED = 'ABANDONED',
}

export const smartProjectBaseData = [
  {
    id: SmartProjectKeys.TODAY,
    title: '今天',
    icon: 'i-carbon-calendar',
    showOption: true,
    count: 2,
  },
  {
    id: SmartProjectKeys.TOMORROW,
    title: '明天',
    icon: 'i-carbon-sunrise',
    hasTool: true,
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
]

export const mainProjectBaseData = [
  {
    id: 'detailList',
    title: '清单',
    children: [{
      id: 'detailList-1',
      title: '清单 1',
      icon: 'i-carbon-menu',
      index: 0,
    },
    {
      id: 'detailList-2',
      title: '清单 2',
      icon: 'i-carbon-menu',
      index: 1,
    },
    {
      id: 'detailList-3',
      title: '清单 3',
      icon: 'i-carbon-menu',
      index: 2,
    }],
  },
  {
    id: 'label',
    title: '标签',
    children: [{
      id: 'label-1',
      title: '标签 1',
      icon: 'i-carbon-tag',
      index: 0,
    }],
  },
  {
    id: 'filterer',
    title: '过滤器',
    children: [{
      id: 'filter-1',
      title: '过滤器 1',
      icon: 'i-carbon-tag',
      index: 0,
    }],
  },
]

export const concludedProjectBaseData = [
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
]
