import Title from '@/common/ui/title/Title'
import { useDeleteTaskMutation, useGetTasksQuery } from '@/service/tasks/tasks.service'

import s from './tasks.module.scss'
type TaskProps = {
  todoListId: string
}

const Tasks = ({ todoListId }: TaskProps) => {
  const { data: tasksData } = useGetTasksQuery(todoListId)
  const [deleteTask, { isLoading }] = useDeleteTaskMutation()

  const deleteTaskHandler = (taskId: string) => async () => {
    await deleteTask({ taskId, todoListId })
  }

  return (
    <div>
      <ol>
        {tasksData?.items.map(el => {
          return (
            <li key={el.id}>
              <Title
                className={s.taskBlock}
                disabled={isLoading}
                onClick={deleteTaskHandler(el.id)}
                title={el.title}
              />
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Tasks
