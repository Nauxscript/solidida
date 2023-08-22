export const debounce = <T = unknown>(fn: (args: T) => void, time = 200) => {
  let timer: ReturnType<typeof setTimeout>
  return (args: T) => {
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      fn(args)
      clearTimeout(timer)
    }, time)
  }
}

export const groupByKey = <T extends Record<string | symbol | number, any>>(data: T[], key: keyof T, format: 'Map' | 'Array' = 'Array', options: {
  groupFn?: (key: keyof T, group: T[]) => unknown
  filter?: (item: T) => boolean
} = {}) => {
  if (!data.length)
    return format === 'Array' ? [] : new Map()
  const { groupFn, filter } = options

  const filteredData = filter ? data.filter(filter) : data

  const result = filteredData.reduce((prev, curr) => {
    const currKey = curr[key]
    if (prev.has(currKey)) {
      const group = prev.get(currKey)
      group?.push(curr)
    }
    else {
      prev.set(currKey, [curr])
    }
    return prev
  }, new Map() as Map<string | symbol | number, T[]>)

  if (format === 'Map')
    return result

  return [...result].map(([key, group]) => {
    if (groupFn)
      return groupFn(key, group)
    return group
  })
}
