import { useGetTasksQuery } from '@/service/tasks/tasks.service'

type TaskProps = {
  todoListId: string
}

const Tasks = ({ todoListId }: TaskProps) => {
  const { data: tasksData } = useGetTasksQuery(todoListId)

  return (
    <div>
      {tasksData?.items.map(el => {
        return (
          <div key={el.id}>
            <ol>
              <li>
                <span>{el.title}</span>
                <button>x</button>
              </li>
            </ol>
          </div>
        )
      })}
    </div>
  )
}

export default Tasks
