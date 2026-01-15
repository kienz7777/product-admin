import { useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../../features/products/productsApi'
import {
  useUpdateStockMutation,
  useUpdateVariantMutation,
} from '../../features/variants/variantsApi'
import { useState } from 'react'
import ImageUploader from '../../components/ImageUploader'

export default function ProductDetail() {
  const { id } = useParams()
  const { data } = useGetProductsQuery({ page: 1, pageSize: 100 })
  const product = data?.items.find((p) => p.id === id)

  const [updateVariant] = useUpdateVariantMutation()
  const [updateStock] = useUpdateStockMutation()

  const [error, setError] = useState<string | null>(null)

  if (!product) return <div>Product not found</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
      <div className="mb-6">
        <ImageUploader productId={product.id} />
      </div>

      <div className="space-y-3">
        {product.variants.map((v) => (
          <div
            key={v.id}
            className="bg-white p-3 rounded shadow flex gap-3 items-center"
          >
            <div className="w-48">
              <div className="font-medium">{v.sku}</div>
              <div className="text-xs text-gray-500">
                v{v.version}
              </div>
            </div>

            <input
              defaultValue={v.price}
              type="number"
              className="border px-2 py-1 w-24"
              onBlur={(e) =>
                updateVariant({
                  id: v.id,
                  price: Number(e.target.value),
                  attributes: v.attributes,
                })
              }
            />

            <input
              defaultValue={v.stock}
              type="number"
              className="border px-2 py-1 w-24"
              onBlur={async (e) => {
                setError(null)
                try {
                  await updateStock({
                    id: v.id,
                    stock: Number(e.target.value),
                    version: v.version,
                  }).unwrap()
                } catch {
                  setError(
                    'This data is outdated. Please refresh to get the latest version.'
                  )
                }
              }}
            />

            <input
              defaultValue={v.attributes}
              className="border px-2 py-1 flex-1"
              onBlur={(e) =>
                updateVariant({
                  id: v.id,
                  price: v.price,
                  attributes: e.target.value,
                })
              }
            />
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  )
}
