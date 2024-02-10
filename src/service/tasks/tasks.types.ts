export type TasksResponse = {
  error: string
  items: Task[]
  totalCount: number
}

export type Task = {
  addedDate: string
  completed: boolean
  deadline: string
  description: string
  id: string
  order: number
  priority: number
  startDate: string
  status: number
  title: string
  todoListId: string
}

export type CreateTask = {
  title: string
  todoListId: string
}
