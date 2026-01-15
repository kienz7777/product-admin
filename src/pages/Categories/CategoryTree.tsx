import { useState } from 'react'
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../features/categories/categoriesApi'
import { Category } from '../../features/categories/types'

function CategoryNode({ node }: { node: Category }) {
  const [expanded, setExpanded] = useState(true)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(node.name)
  const [showAdd, setShowAdd] = useState(false)
  const [childName, setChildName] = useState('')

  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const [createCategory] = useCreateCategoryMutation()

  const handleRename = async () => {
    await updateCategory({
      id: node.id,
      name,
      parentId: node.parentId,
    }).unwrap()
    setEditing(false)
  }

  const handleAddChild = async () => {
    if (!childName.trim()) return
    await createCategory({
      name: childName,
      parentId: node.id,
    }).unwrap()
    setChildName('')
    setShowAdd(false)
    setExpanded(true)
  }

  const handleDelete = async () => {
    if (!confirm('Delete this category and all children?')) return
    await deleteCategory(node.id).unwrap()
  }

  return (
    <div className="ml-4 mt-2">
      <div className="flex items-center gap-2">
        {node.children.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs w-4"
          >
            {expanded ? '-' : '+'}
          </button>
        )}

        {editing ? (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-1 text-sm"
            />
            <button onClick={handleRename} className="text-green-600 text-xs">
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-gray-500 text-xs"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span className="font-medium">{node.name}</span>
            <button
              onClick={() => setEditing(true)}
              className="text-blue-600 text-xs"
            >
              Rename
            </button>
            <button
              onClick={() => setShowAdd(true)}
              className="text-green-600 text-xs"
            >
              +Child
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 text-xs"
            >
              Delete
            </button>
          </>
        )}
      </div>

      {showAdd && (
        <div className="ml-6 mt-1 flex gap-2">
          <input
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="border px-2 text-sm"
            placeholder="Child name"
          />
          <button onClick={handleAddChild} className="text-green-600 text-xs">
            Add
          </button>
          <button
            onClick={() => setShowAdd(false)}
            className="text-gray-500 text-xs"
          >
            Cancel
          </button>
        </div>
      )}

      {expanded &&
        node.children.map((c) => <CategoryNode key={c.id} node={c} />)}
    </div>
  )
}

export default function CategoryTree() {
  const { data, isLoading, error } = useGetCategoriesQuery()
  const [createCategory] = useCreateCategoryMutation()
  const [rootName, setRootName] = useState('')

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">Failed to load categories</div>

  const handleAddRoot = async () => {
    if (!rootName.trim()) return
    await createCategory({ name: rootName, parentId: null }).unwrap()
    setRootName('')
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>

      <div className="mb-4 flex gap-2">
        <input
          value={rootName}
          onChange={(e) => setRootName(e.target.value)}
          className="border px-3 py-1 rounded"
          placeholder="New root category"
        />
        <button
          onClick={handleAddRoot}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {data!.map((c) => (
          <CategoryNode key={c.id} node={c} />
        ))}
      </div>
    </div>
  )
}
