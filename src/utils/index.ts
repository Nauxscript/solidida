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

export const groupByKey = <T extends Record<string | symbol | number, any>>(data: T[], key: keyof T, groupFn?: (key: keyof T, group: T[]) => unknown): T[][] | unknown[] => {
  const result = data.reduce((prev, curr) => {
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
  return [...result].map(([key, group]) => {
    if (groupFn)
      return groupFn(key, group)
    return group
  })
}
