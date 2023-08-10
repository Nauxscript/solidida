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

      Object.defineProperty(window.navigator, 'platform', { value: 'MacOS', configurable: true })
  test('cmd + k to ativate command modal on MacOS', async () => {
    await createRoot(async (dispose) => {
      const { registerKeyboardShortcut, commandModalVisible } = useCommandModal()
      const user = userEvent.setup()
      registerKeyboardShortcut()
      await user.keyboard('{Meta>}k/')
      expect(commandModalVisible()).toBe(true)
    })
  })
      Object.defineProperty(window.navigator, 'platform', { value: 'Window', configurable: true })
  test('ctrl + k to ativate command modal on Window', async () => {
    await createRoot(async (dispose) => {
      const { registerKeyboardShortcut, commandModalVisible } = useCommandModal()
      const user = userEvent.setup()
      registerKeyboardShortcut()
      await user.keyboard('{Control>}k/')
      expect(commandModalVisible()).toBe(true)
    })
  })
})
