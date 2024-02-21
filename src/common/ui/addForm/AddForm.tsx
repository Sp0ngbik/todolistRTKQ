import { useForm } from 'react-hook-form'

import { AddTask, addFormSchema } from '@/common/ui/addForm/utils/addFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'

import s from '@/components/TodoList/todoList.module.scss'

type AddFormProps = {
  onSubmit: (title: string) => void
  placeHolder: string
}
type FormValue = {
  title: string
}
const AddForm = (props: AddFormProps) => {
  const { onSubmit, placeHolder } = props
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<AddTask>({
    resolver: zodResolver(addFormSchema),
  })
  const submitHandler = (data: FormValue) => {
    onSubmit(data.title)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={s.addTaskForm}>
        <input {...register('title')} placeholder={placeHolder} />
        <button>Add task</button>
      </div>
      {errors.title && <div className={s.errorMessage}>{errors.title.message}</div>}
    </form>
  )
}

export default AddForm
