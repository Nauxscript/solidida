import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { useCommandModal, useSearch } from '../'
import { mockPlatform } from '@/test/helper'
import type { Task } from '@/store'
import { TaskStatus } from '@/store'
import { findAllTask } from '@/api'

vi.mock('@/api')

const findAllTaskResponse = (keyword: string): Task[] => ([{
  title: keyword,
  id: 'i',
  status: TaskStatus.ACTIVE,
  content: '',
  tag: [],
  projectId: '1',
  position: 0,
  createDate: new Date(),
}])

vi.mocked(findAllTask).mockImplementation(async (keyword: string) => ({
  data: findAllTaskResponse(keyword),
}))

describe('Command Modal', () => {
  beforeEach(() => {
    const { closeCommandModal } = useCommandModal()
    closeCommandModal()
    // clear platform mock
    mockPlatform('')
    vi.clearAllMocks()
  })
  describe('basic control of command modal', () => {
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

    test('cmd + k to ativate command modal on MacOS', async () => {
      await createRoot(async (dispose) => {
        mockPlatform('MacOS')
        const { registerKeyboardShortcut, commandModalVisible } = useCommandModal()
        const user = userEvent.setup()
        registerKeyboardShortcut()
        await user.keyboard('{Meta>}k/')
        expect(commandModalVisible()).toBe(true)
        dispose()
      })
    })

    test('ctrl + k to ativate command modal on Window', async () => {
      await createRoot(async (dispose) => {
        mockPlatform('Window')
        const { registerKeyboardShortcut, commandModalVisible } = useCommandModal()
        const user = userEvent.setup()
        registerKeyboardShortcut()
        await user.keyboard('{Control>}k/')
        expect(commandModalVisible()).toBe(true)
        dispose()
      })
    })

    test('cmd + k to ativate command modal and trigger this shorcut again will close the modal', async () => {
      await createRoot(async () => {
        mockPlatform('MacOS')
        const { registerKeyboardShortcut, commandModalVisible } = useCommandModal()
        const user = userEvent.setup()
        registerKeyboardShortcut()
        await user.keyboard('{Meta>}k/')
        await user.keyboard('{Meta>}k/')
        expect(commandModalVisible()).toBe(false)
      })
    })
  })

  describe('basic search', () => {
    test('search task', () => {
      createRoot(async () => {
        const { openCommandModal } = useCommandModal()
        const { search, filterTasks } = useSearch()
        openCommandModal()
        const keyword = '吃饭'
        await search(keyword)
        expect(filterTasks()[0].title).toBe(keyword)
      })
    })

    test.todo('command search', () => {
      createRoot(async () => {
        const { openCommandModal } = useCommandModal()
        const { search, filterTasks } = useSearch()
        openCommandModal()
        const keyword = '> '
        await search(keyword)
        expect(filterTasks.length).toBe(1)
      })
    })
  })
})
