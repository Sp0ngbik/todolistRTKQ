import { useForm } from 'react-hook-form'

import Tasks from '@/components/Tasks/Tasks'
import { AddTask, addNewTask } from '@/components/TodoList/utils/taskSchema'
import { useCreateTaskMutation } from '@/service/tasks/tasks.service'
import { TodoListBody } from '@/service/todoList/todoList.types'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './todoList.module.scss'

type FormValue = {
  taskName: string
}
type TodoListProps = {
  todoList: TodoListBody
}

const TodoList = ({ todoList }: TodoListProps) => {
  const [createTask] = useCreateTaskMutation()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<AddTask>({
    resolver: zodResolver(addNewTask),
  })

  const onSubmit = async (data: FormValue) => {
    await createTask({ title: data.taskName, todoListId: todoList.id })
    reset()
  }

  return (
    <div className={s.todoList}>
      <h3>{todoList.title}</h3>
      <button>X</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('taskName')} placeholder={'Add new task'} />
        <button>Add task</button>
        {errors.taskName && <div className={s.errorMessage}>{errors.taskName.message}</div>}
      </form>
      <Tasks todoListId={todoList.id} />
    </div>
  )
}

export default TodoList
