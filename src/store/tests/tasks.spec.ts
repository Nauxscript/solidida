import { describe } from 'vitest'
import { createRoot } from 'solid-js'
import { useTasksStore } from '../tasks'
import { ProjectType } from '../listProjects'
import { useTasksSelectorStore } from './../taskSelector'

describe('Task Store', () => {
  beforeEach(() => {
    createRoot(() => {
      const updaTasks = useTasksStore(state => state.updateTasks)
      updaTasks([])
      const setCurrentSeletor = useTasksSelectorStore(state => state.setCurrentSeletor)
      setCurrentSeletor({
        id: '1',
        name: '集合',
        type: ProjectType.LIST_PROJECT,
      })
    })
  })
  test('should add task', () => {
    createRoot(() => {
      const [tasks, addTask] = useTasksStore(state => [state.tasks, state.addTask])
      const taskTitle = '吃饭'
      const task = addTask(taskTitle)
      expect(task?.title).toBe(taskTitle)
      expect(tasks[tasks.length - 1].title).toBe(taskTitle)
      expect(task?.projectId).toBe('1')
    })
  })

  test('should not add task when have no active project', () => {
    createRoot(() => {
      const setCurrentSeletor = useTasksSelectorStore(state => state.setCurrentSeletor)
      setCurrentSeletor(null)
      const [tasks, addTask] = useTasksStore(state => [state.tasks, state.addTask])
      const taskTitle = '吃饭'
      const task = addTask(taskTitle)
      expect(task).toBeUndefined()
      expect(tasks.length).toBe(0)
    })
  })

  test('should remove task', () => {
    createRoot(() => {
      const [tasks, addTask, removeTask] = useTasksStore(state => [state.tasks, state.addTask, state.removeTask])
      const taskTitle = '吃饭'
      const task = addTask(taskTitle)
      removeTask(task!)
      expect(tasks.length).toBe(0)
    })
  })

  test.todo('should complete task')
})
