import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import TodoListApp from '@/pages/TodoListsApp/TodoListApp'

const router = createBrowserRouter([
  {
    element: <TodoListApp />,
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
