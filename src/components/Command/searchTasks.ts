import { findAllTask } from '@/api'

export const useSearchTasks = () => {
  const searchTasks = async (keyword: string) => {
    const { data } = await findAllTask(keyword)
    return data
  }

  return {
    searchTasks,
  }
}
