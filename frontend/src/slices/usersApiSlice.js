import { USERS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ keyword, page }) => ({
              url: USERS_URL,
              params: { keyword, page }
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        getProfile: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile`,
            })
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
    })
})

export const { 
    useGetUsersQuery,
    useUpdateProfileMutation,
    useGetProfileQuery
} = usersApiSlice