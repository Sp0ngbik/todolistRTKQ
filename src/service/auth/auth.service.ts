import { LoginBody, MeResponse } from '@/service/auth/auth.types'
import { baseApi } from '@/service/base-api'

const authService = baseApi.injectEndpoints({
  endpoints(builder) {
    return {
      login: builder.mutation<void, LoginBody>({
        invalidatesTags: ['Me'],
        query: args => ({
          body: args,
          method: 'POST',
          url: '/auth/login',
        }),
      }),
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        query: () => ({
          method: 'DELETE',
          url: '/auth/login',
        }),
      }),
      me: builder.query<MeResponse, void>({
        providesTags: ['Me'],
        query: () => '/auth/me',
      }),
    }
  },
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authService
