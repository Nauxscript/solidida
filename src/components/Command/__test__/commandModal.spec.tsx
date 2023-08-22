import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { useCommandModal, useSearch } from '../'
import { mockPlatform } from '@/test/helper'
import type { Task } from '@/store'
import { TaskStatus, useConcludedProjectsStore, useSmartProjectsStore } from '@/store'
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
    createRoot(() => {
      const { closeCommandModal } = useCommandModal()
      closeCommandModal()
      const { initSearch } = useSearch()
      initSearch()
    })
    // clear platform mock
    mockPlatform('')
    vi.clearAllMocks()
  })
  describe('basic control of command modal', () => {
    test('open command modal', () => {
      createRoot(() => {
        const { openCommandModal, commandModalVisible } = useCommandModal()
        const { filterTasks } = useSearch()
        const smartProjectsStore = useSmartProjectsStore()
        const concludedProjectsStore = useConcludedProjectsStore()
        openCommandModal()
        expect(commandModalVisible()).toBe(true)
        expect(filterTasks().length).toEqual(smartProjectsStore.smartProjects.length + concludedProjectsStore.concludedProjects.length)
      })
    })

    test('close command modal', () => {
      createRoot(() => {
        const { openCommandModal, closeCommandModal, commandModalVisible } = useCommandModal()
        openCommandModal()
        closeCommandModal()
        expect(commandModalVisible()).toBe(false)
      })
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

    test('command search', () => {
      createRoot(async () => {
        const { openCommandModal } = useCommandModal()
        const { search, filterTasks } = useSearch()
        openCommandModal()
        const command = '明天'
        const keyword = `> ${command}`
        await search(keyword)
        expect(filterTasks()[0].title).toBe(command)
      })
    })

    test('search loading', () => {
      createRoot(async () => {
        const { openCommandModal } = useCommandModal()
        const { search, loading } = useSearch()
        openCommandModal()
        expect(loading()).toBeFalsy()
        search('吃饭')
        expect(loading()).toBeTruthy()
        await new Promise(resolve => setTimeout(resolve))
        expect(loading()).toBeFalsy()
      })
    })
  })
})
