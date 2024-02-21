import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { AddTask, addFormSchema } from '@/common/ui/addForm/utils/addFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './title.module.scss'

type TitleProps = {
  className?: string
  disabled: boolean
  onClick: () => void
  title: string
  variant?: 'taskTitle' | 'todoTitle'
}

const Title = (props: TitleProps) => {
  const [editMode, setEditMode] = useState(false)
  const { className, disabled, onClick, title, variant = 'taskTitle' } = props
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<AddTask>({
    defaultValues: { title: title },
    resolver: zodResolver(addFormSchema),
  })
  const submitHandler = (data: any) => {
    console.log(data)
    // onSubmit(data.title)
    setEditMode(false)
    reset()
  }

  const activateEditMode = () => {
    setEditMode(true)
  }

  return (
    <div className={className}>
      {editMode ? (
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={s.addTaskForm}>
            <input {...register('title')} />
            <button>Add task</button>
          </div>
          {errors.title && <div className={s.errorMessage}>{errors.title.message}</div>}
        </form>
      ) : (
        <>
          <span className={s[variant]} onDoubleClick={activateEditMode}>
            {title}
          </span>
          <button disabled={disabled} onClick={onClick}>
            X
          </button>
        </>
      )}
    </div>
  )
}

export default Title
