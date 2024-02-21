import AddForm from '@/common/ui/addForm/AddForm'
import Title from '@/common/ui/title/Title'
import Tasks from '@/components/Tasks/Tasks'
import { useCreateTaskMutation } from '@/service/tasks/tasks.service'
import { useDeleteTodosMutation } from '@/service/todoList/todoList.service'
import { TodoListBody } from '@/service/todoList/todoList.types'

import s from './todoList.module.scss'

type TodoListProps = {
  todoList: TodoListBody
}

const TodoList = ({ todoList }: TodoListProps) => {
  const [createTask] = useCreateTaskMutation()
  const [deleteTodo, { isLoading }] = useDeleteTodosMutation()

  const deleteTodoHandler = async () => {
    await deleteTodo(todoList.id)
  }

  const onSubmit = async (title: string) => {
    await createTask({ title, todoListId: todoList.id })
  }

  return (
    <div className={s.todoList}>
      <Title
        className={s.todoListHeader}
        disabled={isLoading}
        onClick={deleteTodoHandler}
        title={todoList.title}
        variant={'todoTitle'}
      />
      <AddForm onSubmit={onSubmit} placeHolder={'Add new Task'} />
      <Tasks todoListId={todoList.id} />
    </div>
  )
}

export default TodoList
