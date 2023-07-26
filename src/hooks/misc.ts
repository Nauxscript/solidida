export const useIsMac = () => {
  return createMemo(() => /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) || false)
}
