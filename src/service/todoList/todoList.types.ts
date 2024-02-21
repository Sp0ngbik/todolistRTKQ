export type TodoListBody = {
  addedDate: string
  id: string
  order: number
  title: string
}

export type TodoListCreateResponse = {
  data: {
    item: {
      addedDate: string
      id: string
      order: number
      title: string
    }
  }
}

export type TodoListsResponse = TodoListBody[]
