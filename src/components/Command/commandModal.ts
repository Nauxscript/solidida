import { createSignal } from 'solid-js'
import { createShortcut } from '@solid-primitives/keyboard'
import { useSearch } from './search'
import { useIsMac } from '@/hooks/misc'
const [commandModalVisible, setCommandModalVisible] = createSignal(false)

// got bug in Mac when using meta shortcut, refer to https://github.com/solidjs-community/solid-primitives/pull/279
const shortcutOfMac = ['Meta', 'k']
const shortcutOfWin = ['Control', 'k']

export const useCommandModal = () => {
  const { resetSearch } = useSearch()

  const openCommandModal = () => {
    setCommandModalVisible(true)
  }

  const closeCommandModal = () => {
    setCommandModalVisible(false)
    resetSearch()
  }

  const toggleCommandModal = (visible?: boolean) => {
    if (visible === true || !commandModalVisible())
      openCommandModal()
    else if (visible === false || commandModalVisible())
      closeCommandModal()
  }

  const registerKeyboardShortcut = () => {
    const isMac = useIsMac()
    let shorcutComb
    if (isMac())
      shorcutComb = shortcutOfMac
    else
      shorcutComb = shortcutOfWin

    createShortcut(shorcutComb, () => {
      toggleCommandModal()
    }, {
      preventDefault: true,
    })
  }

  return {
    closeCommandModal,
    commandModalVisible,
    openCommandModal,
    registerKeyboardShortcut,
    setCommandModalVisible,
    toggleCommandModal,
  }
}
