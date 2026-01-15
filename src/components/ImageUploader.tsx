import { useState } from 'react'
import { useUploadImageMutation } from '../features/products/productsApi'

export default function ImageUploader({ productId }: { productId: string }) {
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [upload, { isLoading }] = useUploadImageMutation()

  const onSelect = async (file: File) => {
    setError(null)

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setError('Only PNG or JPG images are allowed.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be smaller than 2MB.')
      return
    }

    setPreview(URL.createObjectURL(file))

    try {
      await upload({ productId, file }).unwrap()
    } catch {
      setError('Upload failed.')
    }
  }

  return (
    <div className="border p-3 rounded bg-white">
      <input
        type="file"
        accept="image/png,image/jpeg"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onSelect(f)
        }}
      />

      {preview && (
        <img
          src={preview}
          className="mt-2 w-32 h-32 object-cover rounded"
        />
      )}

      {isLoading && (
        <div className="text-sm text-gray-500 mt-1">Uploading...</div>
      )}

      {error && (
        <div className="text-sm text-red-600 mt-1">{error}</div>
      )}
    </div>
  )
}
