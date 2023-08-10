import userEvent from '@testing-library/user-event'
import { useCommandModal } from '../'
describe('Command Modal', () => {
  beforeEach(() => {
    const { closeCommandModal } = useCommandModal()
    closeCommandModal()
  })
  test('open command modal', () => {
    const { openCommandModal, commandModalVisible } = useCommandModal()
    openCommandModal()
    expect(commandModalVisible()).toBe(true)
  })

  test('close command modal', () => {
    const { openCommandModal, closeCommandModal, commandModalVisible } = useCommandModal()
    openCommandModal()
    closeCommandModal()
    expect(commandModalVisible()).toBe(false)
  })

  test('cmd + k to ativate command modal on MacOS', () => {
    createRoot(async () => {
      Object.defineProperty(window.navigator, 'platform', { value: 'MacOS', configurable: true })
      const { registerKeyboardShortcut, commandModalVisible } = useCommandModal()
      const user = userEvent.setup()
      registerKeyboardShortcut()
      await user.keyboard('{Meta>}k/')
      expect(commandModalVisible()).toBe(true)
    })
  })
  test('ctrl + k to ativate command modal on Window', () => {
    createRoot(async () => {
      Object.defineProperty(window.navigator, 'platform', { value: 'Window', configurable: true })
      const { registerKeyboardShortcut, commandModalVisible } = useCommandModal()
      const user = userEvent.setup()
      registerKeyboardShortcut()
      await user.keyboard('{Control>}k/')
      expect(commandModalVisible()).toBe(true)
    })
  })
})
