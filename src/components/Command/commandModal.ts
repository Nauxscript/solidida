import { createSignal } from 'solid-js'
const [commandModalVisible, setCommandModalVisible] = createSignal(false)

export const useCommandModal = () => {
  const openCommandModal = () => {
    setCommandModalVisible(true)
  }

  const closeCommandModal = () => {
    setCommandModalVisible(false)
  }

  const toggleCommandModal = () => {
    setCommandModalVisible(prev => !prev)
  }

export {
  showSearchPanel,
  return {
    openCommandModal,
    closeCommandModal,
  }
}
