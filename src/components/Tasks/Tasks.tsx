import { toast } from 'react-toastify'

import { TasksStatus } from '@/common/const/const'
import CheckBox from '@/common/ui/checkbox/CheckBox'
import Title from '@/common/ui/title/Title'
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from '@/service/tasks/tasks.service'
import { ErrorResponse, Task, TaskResponseError } from '@/service/tasks/tasks.types'

import s from './tasks.module.scss'
type TaskProps = {
  todoListId: string
}

const Tasks = ({ todoListId }: TaskProps) => {
  const { data: tasksData } = useGetTasksQuery(todoListId)
  const [deleteTask, { isLoading }] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const deleteTaskHandler = (taskId: string) => async () => {
    await deleteTask({ taskId, todoListId })
  }

  const updateTaskTitleHandler = (task: Task, title: string) => {
    const newBodyTask: Task = {
      ...task,
      title,
    }

    toast
      .promise(updateTask({ data: newBodyTask, todoListId }).unwrap(), {
        pending: 'Update in progress',
        success: 'Task was updated',
      })
      .catch((err: TaskResponseError) => {
        toast.error(err.messages[0])
      })
  }

  const updateTaskStatus = (task: Task, newStatus: boolean) => {
    const status = newStatus ? TasksStatus.Completed : TasksStatus.InProgress
    const newBodyTask: Task = {
      ...task,
      status,
    }

    toast
      .promise(updateTask({ data: newBodyTask, todoListId }).unwrap(), {
        pending: 'Update in progress',
        success: 'Task status was updated',
      })
      .catch((err: ErrorResponse) => {
        toast.error(err.messages[0])
      })
  }

  return (
    <div>
      {tasksData?.items.map(el => {
        return (
          <li className={s.taskBlock} key={el.id}>
            <CheckBox
              checked={el.status === TasksStatus.Completed}
              id={el.id}
              label={
                <Title
                  className={s.task}
                  onSubmit={(title: string) => updateTaskTitleHandler(el, title)}
                  status={el.status}
                  title={el.title}
                />
              }
              onCheckedChange={(completed: boolean) => updateTaskStatus(el, completed)}
            />
            <button disabled={isLoading} onClick={deleteTaskHandler(el.id)}>
              X
            </button>
          </li>
        )
      })}
    </div>
  )
}

export default Tasks
