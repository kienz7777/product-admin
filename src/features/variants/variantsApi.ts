import { api } from '../../store/apiSlice'
import { Variant } from './types'

export const variantsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateVariant: builder.mutation<
      void,
      { id: string; price: number; attributes: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/api/variants/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),

    updateStock: builder.mutation<
      void,
      { id: string; stock: number; version: number }
    >({
      query: ({ id, ...body }) => ({
        url: `/api/variants/${id}/stock`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
})

export const { useUpdateVariantMutation, useUpdateStockMutation } = variantsApi
