import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Header from '@/components/Header/Header'
import SignIn from '@/components/SignIn/SignIn'
import TodoListApp from '@/pages/TodoListsApp/TodoListApp'

const router = createBrowserRouter([
  {
    children: [
      {
        element: <TodoListApp />,
        path: '/',
      },
      {
        element: <SignIn />,
        path: '/sign-in',
      },
    ],
    element: <Header />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
