import { createSignal } from 'solid-js'
const [showSearchPanel, setShowSearchPanel] = createSignal(false)

export const useSearch = () => {
  const openSearchPanel = () => {
    setShowSearchPanel(true)
  }

  const closeSearchPanel = () => {
    setShowSearchPanel(false)
  }

  return {
    openSearchPanel,
    closeSearchPanel,
  }
}

export {
  showSearchPanel,
}
