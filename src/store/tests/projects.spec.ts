import { describe, vi } from 'vitest'
import { collectedProject } from '../smartProjects'
import { useTasksSelectorStore } from '../taskSelector'
import type { Task } from '..'
import { TaskStatus, useTasksStore } from '..'
import { loadSmartProjectTasks } from '@/api'

vi.mock('@/api')

const createTaskResponse = (title: string, projectId: string): Task => {
  return {
    title,
    content: 'task content',
    id: '1',
    projectId,
    status: TaskStatus.ACTIVE,
    tag: [],
    position: 0,
    createDate: new Date(),
  }
}

vi.mocked(loadSmartProjectTasks).mockImplementation(async (smartProjectId: string) => ({
  data: [createTaskResponse('吃饭', smartProjectId)],
}))

describe('Project Store', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('should init with collected project data', async () => {
    await createRoot(async () => {
      const [currentSelector, init] = useTasksSelectorStore(state => [state.currentSelector, state.init])
      const [tasks] = useTasksStore(state => [state.tasks])
      await init()
      expect(currentSelector?.id).toBe(collectedProject.id)
      expect(loadSmartProjectTasks).toBeCalled()
      expect(tasks[0].title).toBe('吃饭')
    })
  })

  test('should select concluded project', async () => {
    await createRoot(async () => {
      const [currentSelector, init] = useTasksSelectorStore(state => [state.currentSelector, state.init])
      const [tasks] = useTasksStore(state => [state.tasks])
      await init()
      expect(currentSelector?.id).toBe(collectedProject.id)
      expect(loadSmartProjectTasks).toBeCalled()
      expect(tasks[0].title).toBe('吃饭')
    })
  })
})
