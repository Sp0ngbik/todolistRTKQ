import { useForm } from 'react-hook-form'

import TodoList from '@/components/TodoList/TodoList'
import { useCreateTodoMutation, useGetTodosQuery } from '@/service/todoList/todoList.service'

import s from './todoLists.module.scss'

type TodoListTitle = {
  todoListTitle: string
}

const TodoLists = () => {
  const { data: dataTodoLists } = useGetTodosQuery()
  const [createTodoList] = useCreateTodoMutation()
  const { handleSubmit, register, reset } = useForm<TodoListTitle>()
  const onSubmit = async (data: TodoListTitle) => {
    await createTodoList({ title: data.todoListTitle })
    reset()
  }

  return (
    <div className={s.todoListBlockWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('todoListTitle')} placeholder={'Create new TodoList'} />
        <button>Add</button>
      </form>
      <div className={s.todoLists}>
        {dataTodoLists?.map(el => {
          return <TodoList key={el.id} todoList={el} />
        })}
      </div>
    </div>
  )
}

export default TodoLists
