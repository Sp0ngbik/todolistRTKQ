import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import SignIn from '@/components/SignIn/SignIn'
import TodoListApp from '@/pages/TodoListsApp/TodoListApp'

const router = createBrowserRouter([
  {
    element: <TodoListApp />,
    path: '/',
  },
  {
    element: <SignIn />,
    path: '/sign-in',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
