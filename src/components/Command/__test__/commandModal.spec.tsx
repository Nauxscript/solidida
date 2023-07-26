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

})
