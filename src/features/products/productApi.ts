import { api } from '../../store/apiSlice'
import { Product } from './types'

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      { items: Product[]; total: number },
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) =>
        `/api/products?page=${page}&pageSize=${pageSize}`,
      providesTags: ['Product'],
    }),

    createProduct: builder.mutation<void, Partial<Product>>({
      query: (body) => ({
        url: '/api/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation<
      void,
      { id: string } & Partial<Product>
    >({
      query: ({ id, ...body }) => ({
        url: `/api/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    uploadImage: builder.mutation<void, { id: string; file: File }>({
      query: ({ id, file }) => {
        const form = new FormData()
        form.append('file', file)

        return {
          url: `/api/products/${id}/image`,
          method: 'POST',
          body: form,
        }
      },
      invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadImageMutation,
} = productsApi
