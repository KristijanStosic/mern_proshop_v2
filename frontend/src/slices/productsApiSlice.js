import { PRODUCTS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword, page, sort }) => ({
                url: PRODUCTS_URL,
                params: { keyword, page, sort }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Products'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
              url: `/api/upload`,
              method: 'POST',
              body: data,
            }),
          }),
    })
})

export const { 
    useGetProductsQuery, 
    useGetProductByIdQuery, 
    useCreateProductMutation,
    useUploadProductImageMutation
} = productsApiSlice