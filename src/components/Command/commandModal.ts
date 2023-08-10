import { createSignal } from 'solid-js'
import { createShortcut } from '@solid-primitives/keyboard'
import { useIsMac } from '@/hooks/misc'
const [commandModalVisible, setCommandModalVisible] = createSignal(false)

const shortcutOfMac = ['Meta', 'k']
const shortcutOfWin = ['Control', 'k']

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

  const registerKeyboardShortcut = () => {
    const isMac = useIsMac()
    let shorcutComb
    if (isMac())
      shorcutComb = shortcutOfMac
    else
      shorcutComb = shortcutOfWin

    createShortcut(shorcutComb, () => {
      // eslint-disable-next-line no-console
      console.log('sk')
      toggleCommandModal()
    }, {
      preventDefault: true,
    })
  }

  return {
    openCommandModal,
    closeCommandModal,
    commandModalVisible,
    setCommandModalVisible,
    registerKeyboardShortcut,
  }
}
