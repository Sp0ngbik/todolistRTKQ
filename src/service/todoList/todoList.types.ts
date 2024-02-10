export type TodoListBody = {
  addedDate: string
  id: string
  order: number
  title: string
}

export type TodoListResponse = TodoListBody[]
