import { USERS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ keyword, page }) => ({
              url: USERS_URL,
              params: { keyword, page }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Users'],
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const { 
    useGetUsersQuery,
    useProfileMutation,
} = usersApiSlice