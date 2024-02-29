import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AuthStatus } from '@/common/const/const'
import AddForm from '@/common/ui/addForm/AddForm'
import TodoList from '@/components/TodoList/TodoList'
import { useMeQuery } from '@/service/auth/auth.service'
import { ErrorResponse } from '@/service/tasks/tasks.types'
import { useCreateTodoMutation, useGetTodosQuery } from '@/service/todoList/todoList.service'

import s from './todoListApp.module.scss'
const TodoListApp = () => {
  const { data: dataTodoLists } = useGetTodosQuery()
  const { data: me } = useMeQuery()
  const [createTodoList] = useCreateTodoMutation()
  const onSubmit = async (title: string) => {
    toast
      .promise(createTodoList({ title }), {
        pending: 'Create in progress',
        success: 'TodoList created',
      })
      .catch((err: ErrorResponse) => {
        toast.error(err.messages[0])
      })
  }

  if (me?.resultCode === AuthStatus.NotAuthorized) {
    return <Navigate to={'/sign-in'} />
  }

  return (
    <div className={s.todoListBlockWrapper}>
      <AddForm onSubmit={onSubmit} placeHolder={'Create new TodoList'} />

      <div className={s.todoLists}>
        {dataTodoLists?.map(el => {
          return <TodoList key={el.id} todoList={el} />
        })}
      </div>
    </div>
  )
}

export default TodoListApp
