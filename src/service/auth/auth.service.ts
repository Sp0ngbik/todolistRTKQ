import { LoginBody } from '@/service/auth/auth.types'
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
      me: builder.query<void, any>({
        providesTags: ['Me'],
        query: () => '/auth/me',
      }),
    }
  },
})

export const { useLoginMutation, useMeQuery } = authService
