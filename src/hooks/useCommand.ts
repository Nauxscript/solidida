export interface Command {
  id: string
  title: string
  type: 'COMMAND'
  execute: () => void
}

export const useCommand = () => {

  const searchCommands = (keyword: string) => {
    return []
  }

  return {
    searchCommands
  }
}