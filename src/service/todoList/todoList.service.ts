import { baseApi } from '@/service/base-api'
import { TodoListCreateResponse, TodoListsResponse } from '@/service/todoList/todoList.types'

const todoListService = baseApi.injectEndpoints({
  endpoints(builder) {
    return {
      createTodo: builder.mutation<TodoListCreateResponse, { title: string }>({
        invalidatesTags: ['Todos'],
        query: title => ({
          body: title,
          method: 'POST',
          url: 'todo-lists',
        }),
      }),
      deleteTodos: builder.mutation<void, string>({
        invalidatesTags: ['Todos'],
        query: todoListId => ({
          method: 'DELETE',
          url: `todo-lists/${todoListId}`,
        }),
      }),
      getTodos: builder.query<TodoListsResponse, void>({
        providesTags: ['Todos'],
        query: () => 'todo-lists',
      }),
      updateTodos: builder.mutation<void, { title: string; todoListId: string }>({
        invalidatesTags: ['Todos'],
        query: ({ todoListId, ...args }) => ({
          body: args,
          method: 'PUT',
          url: `todo-lists/${todoListId}`,
        }),
      }),
    }
  },
})

export const {
  useCreateTodoMutation,
  useDeleteTodosMutation,
  useGetTodosQuery,
  useUpdateTodosMutation,
} = todoListService
