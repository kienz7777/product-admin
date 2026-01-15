export interface Category {
  id: string
  name: string
  parentId: string | null
  children: Category[]
}

export interface CreateCategoryDto {
  name: string
  parentId: string | null
}
