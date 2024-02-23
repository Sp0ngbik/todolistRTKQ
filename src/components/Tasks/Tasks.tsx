import { TasksStatus } from '@/common/const/const'
import CheckBox from '@/common/ui/checkbox/CheckBox'
import Title from '@/common/ui/title/Title'
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from '@/service/tasks/tasks.service'
import { Task } from '@/service/tasks/tasks.types'

import s from './tasks.module.scss'
type TaskProps = {
  todoListId: string
}

const Tasks = ({ todoListId }: TaskProps) => {
  const { data: tasksData } = useGetTasksQuery(todoListId)
  const [deleteTask, { isLoading }] = useDeleteTaskMutation()
  const [updateTaskTitle] = useUpdateTaskMutation()
  const deleteTaskHandler = (taskId: string) => async () => {
    await deleteTask({ taskId, todoListId })
  }

  const updateTaskTitleHandler = (task: Task, title: string) => {
    const newBodyTask: Task = {
      ...task,
      title,
    }

    updateTaskTitle({ data: newBodyTask, todoListId })
  }

  const updateTaskStatus = (task: Task, newStatus: boolean) => {
    const status = newStatus ? TasksStatus.Completed : TasksStatus.InProgress
    const newBodyTask: Task = {
      ...task,
      status,
    }

    updateTaskTitle({ data: newBodyTask, todoListId })
  }

  return (
    <div>
      {tasksData?.items.map(el => {
        return (
          <li className={s.taskBlock} key={el.id}>
            <CheckBox
              checked={el.status === TasksStatus.Completed}
              onCheckedChange={(completed: boolean) => updateTaskStatus(el, completed)}
            />
            <Title
              className={s.task}
              disabled={isLoading}
              onClick={deleteTaskHandler(el.id)}
              onSubmit={(title: string) => updateTaskTitleHandler(el, title)}
              title={el.title}
            />
          </li>
        )
      })}
    </div>
  )
}

export default Tasks
