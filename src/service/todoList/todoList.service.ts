import { baseApi } from '@/service/base-api'
import { TodoListResponse } from '@/service/todoList/todoList.types'

const todoListService = baseApi.injectEndpoints({
  endpoints(builder) {
    return {
      createTodo: builder.mutation<any, { title: string }>({
        invalidatesTags: ['Todos'],
        query: title => ({
          body: title,
          method: 'POST',
          url: 'todo-lists',
        }),
      }),
      deleteTodos: builder.mutation({
        invalidatesTags: ['Todos'],
        query: args => ({
          body: args,
          method: 'DELETE',
          url: 'todo-lists',
        }),
      }),
      getTodos: builder.query<TodoListResponse, void>({
        providesTags: ['Todos'],
        query: () => 'todo-lists',
      }),
    }
  },
})

export const { useCreateTodoMutation, useGetTodosQuery } = todoListService
