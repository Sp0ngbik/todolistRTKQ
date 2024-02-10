import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://social-network.samuraijs.com/api/1.1',
    credentials: 'include',
    headers: { 'API-KEY': '227e2530-4e73-4afa-a963-d425c8879724' },
  }),
  endpoints() {
    return {}
  },
  reducerPath: 'baseApi',
  tagTypes: ['Todos', 'Tasks', 'Task', 'Me'],
})
