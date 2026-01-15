export interface ProductVariant {
  id: string
  sku: string
  price: number
  stock: number
  attributes: string
  version: number
}

export interface CategoryRef {
  id: string
  name: string
}

export interface Product {
  id: string
  name: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
  variants: ProductVariant[]
  categories: CategoryRef[]
}

export interface PagedResult<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
}
