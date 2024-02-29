import { TasksStatus } from '@/common/const/const'

export type TasksResponse = {
  error: string
  items: Task[]
  totalCount: number
}
export type TaskResponse = {
  error: string
  items: Task
  totalCount: number
}
export type Task = {
  addedDate: string
  completed: TasksStatus
  deadline: string
  description: string
  id: string
  order: number
  priority: number
  startDate: string
  status: TasksStatus
  title: string
  todoListId: string
}

export type CreateTask = {
  title: string
  todoListId: string
}

export type UpdateTask = {
  completed?: TasksStatus
  deadline?: string
  description?: string
  id: string
  priority?: number
  startDate?: string
  status?: number
  title?: string
}

export type ErrorResponse = {
  data: {}
  messages: string[]
  resultCode: number
}
