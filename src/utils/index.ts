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
