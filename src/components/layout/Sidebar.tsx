import { NavLink } from 'react-router-dom'

const navItem = (to: string, label: string) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded ${
        isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
      }`
    }
  >
    {label}
  </NavLink>
)

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r p-4 space-y-2">
      <h1 className="text-xl font-bold mb-4">Product Admin</h1>
      {navItem('/products', 'Products')}
      {navItem('/categories', 'Categories')}
    </aside>
  )
}
