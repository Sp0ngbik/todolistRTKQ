import { baseApi } from '@/service/base-api'
import { CreateTask, TasksResponse } from '@/service/tasks/tasks.types'

const tasksService = baseApi.injectEndpoints({
  endpoints(builder) {
    return {
      createTask: builder.mutation<TasksResponse, CreateTask>({
        invalidatesTags: ['Tasks'],
        query: ({ todoListId, ...args }) => ({
          body: args,
          method: 'POST',
          url: `todo-lists/${todoListId}/tasks`,
        }),
      }),
      deleteTask: builder.mutation<void, { taskId: string; todoListId: string }>({
        invalidatesTags: ['Tasks'],
        query: args => ({
          method: 'DELETE',
          url: `todo-lists/${args.todoListId}/tasks/${args.taskId}`,
        }),
      }),

      getTasks: builder.query<TasksResponse, string>({
        providesTags: ['Tasks'],
        query: id => `todo-lists/${id}/tasks`,
      }),
    }
  },
})

export const { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery } = tasksService
