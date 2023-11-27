import { apiSlice } from './apiSlice'
import { ORDERS_URL } from '../constants'

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: data,
            }),
        }),
        getOrderById: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 5
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        deleteOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                method: 'DELETE'
            }),
            providesTags: ['Order'],
        }),
    })
})

export const {
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetOrdersQuery,
    useDeleteOrderMutation
} = ordersApiSlice