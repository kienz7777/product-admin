import { api } from '../../store/apiSlice'
import { Category, CreateCategoryDto } from './types'

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/api/categories',
      providesTags: ['Category'],
    }),

    createCategory: builder.mutation<void, CreateCategoryDto>({
      query: (body) => ({
        url: '/api/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),

    updateCategory: builder.mutation<
      void,
      { id: string; name: string; parentId: string | null }
    >({
      query: ({ id, ...body }) => ({
        url: `/api/categories/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Category'],
    }),

    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi
