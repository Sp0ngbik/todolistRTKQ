import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { TasksStatus } from '@/common/const/const'
import { AddTask, addFormSchema } from '@/common/ui/addForm/utils/addFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './title.module.scss'

type TitleProps = {
  className?: string
  onSubmit: (title: string) => void
  status?: TasksStatus
  title: string
  variant?: 'taskTitle' | 'todoTitle'
}

const Title = (props: TitleProps) => {
  const [editMode, setEditMode] = useState(false)
  const { className, onSubmit, status, title, variant = 'taskTitle' } = props
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AddTask>({
    defaultValues: { title: title },
    resolver: zodResolver(addFormSchema),
  })
  const submitHandler = (data: AddTask) => {
    onSubmit(data.title)
    setEditMode(false)
  }

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
  }
  const classNames = {
    titleStyles: clsx(s[variant], status === TasksStatus.Completed && s.taskDone),
  }

  return (
    <div className={className}>
      {editMode ? (
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={s.titleBlock}>
            <input {...register('title')} className={s.editInput} />
            <button type={'submit'}>Change</button>
            <button onClick={deactivateEditMode} type={'button'}>
              Cancel
            </button>
          </div>
          {errors.title && <div className={s.errorMessage}>{errors.title.message}</div>}
        </form>
      ) : (
        <div className={s.taskBlock}>
          <span className={classNames.titleStyles} onDoubleClick={activateEditMode}>
            {title}
          </span>
        </div>
      )}
    </div>
  )
}

export default Title
