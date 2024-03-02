import { toast } from 'react-toastify'

import AddForm from '@/common/ui/addForm/AddForm'
import Title from '@/common/ui/title/Title'
import Tasks from '@/components/Tasks/Tasks'
import { useCreateTaskMutation } from '@/service/tasks/tasks.service'
import { ErrorResponse } from '@/service/tasks/tasks.types'
import { useDeleteTodosMutation, useUpdateTodosMutation } from '@/service/todoList/todoList.service'
import { TodoListBody } from '@/service/todoList/todoList.types'

import s from './todoList.module.scss'

type TodoListProps = {
  todoList: TodoListBody
}

const TodoList = ({ todoList }: TodoListProps) => {
  const [createTask] = useCreateTaskMutation()
  const [deleteTodo, { isLoading }] = useDeleteTodosMutation()
  const [updateTodoTitle] = useUpdateTodosMutation()
  const deleteTodoHandler = async () => {
    toast
      .promise(deleteTodo(todoList.id), {
        pending: 'Deleting TodoList  in progress',
        success: 'TodoList was Deleted',
      })
      .catch((err: ErrorResponse) => {
        toast.error(err.messages[0])
      })
  }

  const updateTodoTitleHandler = (title: string) => {
    updateTodoTitle({ title, todoListId: todoList.id })
  }

  const onSubmit = async (title: string) => {
    await createTask({ title, todoListId: todoList.id })
  }

  return (
    <div className={s.todoList} id={todoList.id}>
      <div className={s.todoListTitle}>
        <Title
          className={s.todoListHeader}
          onSubmit={updateTodoTitleHandler}
          title={todoList.title}
          variant={'todoTitle'}
        />
        <button disabled={isLoading} onClick={deleteTodoHandler}>
          X
        </button>
      </div>
      <AddForm onSubmit={onSubmit} placeHolder={'Add new Task'} />
      <Tasks todoListId={todoList.id} />
    </div>
  )
}

export default TodoList
