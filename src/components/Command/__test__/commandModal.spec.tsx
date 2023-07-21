import { showSearchPanel, useCommandModal } from '../'
describe('Command Modal', () => {
  test('open search panel', () => {
    const { openSearchPanel } = useCommandModal()
    openSearchPanel()
    expect(showSearchPanel()).toBe(true)
  })

  test('close search panel', () => {
    const { openSearchPanel, closeSearchPanel } = useCommandModal()
    openSearchPanel()
    closeSearchPanel()
    expect(showSearchPanel()).toBe(false)
  })
})
