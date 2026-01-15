import { useState } from 'react'
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from '../../features/products/productsApi'

export default function ProductList() {
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)

  const { data, isLoading, error, isFetching } = useGetProductsQuery({
    page,
    pageSize: 10,
  })

  const [createProduct, { isLoading: isCreating }] =
    useCreateProductMutation()

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = String(formData.get('name') || '')
    const description = String(formData.get('description') || '')

    if (!name.trim()) {
      alert('Name is required')
      return
    }

    await createProduct({
      name,
      description,
      status: 'Active',
      categoryIds: [],
    }).unwrap()

    form.reset()
    setShowForm(false)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">Failed to load products</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Create
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white p-4 rounded shadow mb-4 space-y-3"
        >
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              name="name"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isCreating}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {isCreating ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Variants</th>
              <th className="p-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {data!.items.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-medium">
                    <a className="text-blue-600" href={`/products/${p.id}`}>
                        {p.name}
                    </a>
                </td>
                <td className="p-3">{p.status}</td>
                <td className="p-3">{p.variants.length}</td>
                <td className="p-3">
                  {new Date(p.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Page {data!.page} / {Math.ceil(data!.total / data!.pageSize)}
        </span>

        <div className="space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={page * data!.pageSize >= data!.total}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
