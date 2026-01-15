import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import ProductList from '../pages/Products/ProductList'
import CategoryTree from '../pages/Categories/CategoryTree'
import ProductDetail from '../pages/Products/ProductDetail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <ProductList /> },
      { path: '/products', element: <ProductList /> },
      { path: '/categories', element: <CategoryTree /> },
      { path: '/products/:id', element: <ProductDetail /> },
    ],
  },
])
