import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import TodoList from '@/pages/TodoLists/TodoLists'

const router = createBrowserRouter([
  {
    element: <TodoList />,
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
